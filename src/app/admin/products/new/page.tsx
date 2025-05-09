"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 產品類型定義
interface ProductForm {
  name: string;
  description: string;
  price: number;
  original_price: number;
  category_id: number;
  stock: number;
  sku: string;
  weight: number;
  dimensions: string;
  featured: boolean;
  sizes: number[];
  status: string;
  image_paths: string[]; // 儲存圖片路徑而非檔案本身
}

export default function NewProduct() {
  const router = useRouter();
  
  // 狀態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  // 產品表單狀態
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    original_price: 0,
    category_id: 1,
    stock: 0,
    sku: '',
    weight: 0,
    dimensions: '',
    featured: false,
    sizes: [],
    status: 'on_sale',
    image_paths: [] // 初始化為空陣列
  });

  // 模擬所有可用分類
  const categories = [
    { id: 1, name: '男裝' },
    { id: 2, name: '女裝' },
    { id: 3, name: '配飾' },
  ];

  // 模擬所有可用尺碼
  const allSizes = [
    { id: 1, size: 'XS' },
    { id: 2, size: 'S' },
    { id: 3, size: 'M' },
    { id: 4, size: 'L' },
    { id: 5, size: 'XL' },
    { id: 6, size: 'XXL' },
  ];
  
  // 產品狀態選項
  const statusOptions = [
    { value: 'on_sale', label: '在售' },
    { value: 'low_stock', label: '低庫存' },
    { value: 'out_of_stock', label: '缺貨' },
    { value: 'discontinued', label: '停售' }
  ];

  // 處理輸入改變
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  
  // 處理尺碼選擇
  const handleSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const sizeId = parseInt(value);
    
    setFormData((prev) => {
      if (checked) {
        return { ...prev, sizes: [...prev.sizes, sizeId] };
      } else {
        return { ...prev, sizes: prev.sizes.filter(id => id !== sizeId) };
      }
    });
  };
  
  // 處理圖片上傳
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB限制
        setError('圖片大小不能超過10MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setError('只能上傳JPG、PNG或GIF格式的圖片');
        return;
      }
      
      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });
    
    setImageFiles((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
    setError(null);
  };
  
  // 移除圖片
  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    
    // 清除已創建的對象URL，避免內存洩漏
    URL.revokeObjectURL(imagePreviews[index]);
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };
  
  // 上傳圖片到本地資料夾
  const uploadImagesToLocal = async (files: File[]): Promise<string[]> => {
    try {
      const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        
        // 使用API路由上傳檔案到本地資料夾
        // 不要設置 headers，讓瀏覽器自動處理 Content-Type
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '上傳圖片失敗');
        }
        
        const data = await response.json();
        return data.filePath; // 返回保存的路徑
      });
      
      return Promise.all(uploadPromises);
    } catch (error) {
      console.error('上傳圖片失敗:', error);
      throw error;
    }
  };
  
  // 表單提交處理
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 表單驗證
    if (!formData.name.trim()) {
      setError('產品名稱不能為空');
      return;
    }
    
    if (formData.price <= 0) {
      setError('產品價格必須大於0');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // 先上傳圖片到本地資料夾
      let imagePaths: string[] = [];
      if (imageFiles.length > 0) {
        imagePaths = await uploadImagesToLocal(imageFiles);
      }
      
      // 準備產品數據
      const productData = {
        ...formData,
        image_paths: imagePaths // 使用剛上傳的圖片路徑
      };
      
      // 發送API請求
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '添加產品失敗');
      }
      
      const result = await response.json();
      
      // 重定向到產品列表頁面
      router.push('/admin/products');
    } catch (err: any) {
      setError(err.message || '添加產品時發生錯誤');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頂部導航與標題 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              新增服裝
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              添加新的服裝產品到商店
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回列表
            </Link>
          </div>
        </div>
        
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左側主要資訊 */}
            <div className="flex-1 space-y-6">
              {/* 基本信息卡片 */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">基本資訊</h3>
                </div>
                <div className="px-6 py-5 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">產品名稱</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="輸入產品名稱"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">產品描述</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      placeholder="詳細描述產品的特點、材質和用途"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">產品分類</label>
                      <select
                        id="category_id"
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                      <input
                        type="text"
                        name="sku"
                        id="sku"
                        placeholder="例如: SHIRT-2023-001"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.sku}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 價格與庫存卡片 */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">價格與庫存</h3>
                </div>
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                    <div className="sm:col-span-1">
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">原價 (NT$)</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          placeholder="0"
                          min="0"
                          step="1"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formData.price || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="original_price" className="block text-sm font-medium text-gray-700">折扣價 (NT$)</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="original_price"
                          id="original_price"
                          placeholder="0"
                          min="0"
                          step="1"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          value={formData.original_price || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="stock" className="block text-sm font-medium text-gray-700">庫存數量</label>
                      <input
                        type="number"
                        name="stock"
                        id="stock"
                        placeholder="0"
                        min="0"
                        step="1"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        value={formData.stock || ''}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">產品狀態</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={formData.featured}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                      設為精選產品
                    </label>
                  </div>
                </div>
              </div>

              {/* 規格卡片 */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">產品規格</h3>
                </div>
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="weight" className="block text-sm font-medium text-gray-700">重量 (kg)</label>
                      <input
                        type="number"
                        step="0.01"
                        name="weight"
                        id="weight"
                        placeholder="0.00"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">尺寸</label>
                      <input
                        type="text"
                        name="dimensions"
                        id="dimensions"
                        placeholder="例如: 10x20x30 cm"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 右側尺碼與圖片 */}
            <div className="lg:w-96 space-y-6">
              {/* 尺碼卡片 */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">尺碼選項</h3>
                </div>
                <div className="px-6 py-5">
                  <div className="grid grid-cols-3 gap-3">
                    {allSizes.map((size) => (
                      <div key={size.id} className="relative flex">
                        <div className="flex items-center h-5">
                          <input
                            id={`size-${size.id}`}
                            name="sizes"
                            type="checkbox"
                            value={size.id}
                            checked={formData.sizes.includes(size.id)}
                            onChange={handleSizeChange}
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor={`size-${size.id}`}
                            className="font-medium text-gray-700"
                          >
                            {size.size}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 圖片卡片 */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">產品圖片</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {/* 拖放上傳區域 */}
                  <div className="border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6 flex justify-center">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                        >
                          <span>上傳圖片</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            multiple 
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleImageUpload}
                          />
                        </label>
                        <p className="pl-1">或拖放文件</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                    </div>
                  </div>

                  {/* 已上傳圖片預覽區域 */}
                  <div className="space-y-3" id="image-preview-container">
                    {imagePreviews.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group border rounded-md overflow-hidden">
                            <img src={preview} alt={`預覽 ${index}`} className="w-full h-24 object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 text-center py-2">尚未上傳圖片</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 底部操作按鈕 */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 flex items-center justify-end space-x-3">
              <Link
                href="/admin/products"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                取消
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    處理中...
                  </span>
                ) : '建立產品'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 