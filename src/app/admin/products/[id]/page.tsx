'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';

interface ProductEditProps {
  params: {
    id: string;
  };
}

export default function ProductEdit() {
  const router = useRouter();
  const params = useParams();
  const productId = parseInt(params.id as string);
  
  // 狀態管理
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // 產品數據
  const [product, setProduct] = useState<any>(null);
  // 分類與尺寸
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const [allSizes, setAllSizes] = useState<{id: number, size: string}[]>([]);
  
  // 表單數據
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    category: string;
    price: string;
    discountPrice: string;
    stockQuantity: string;
    sku: string;
    weight: string;
    dimensions: string;
    featured: boolean;
    sizes: number[];
  }>({
    name: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    stockQuantity: '',
    sku: '',
    weight: '',
    dimensions: '',
    featured: false,
    sizes: [],
  });
  
  // 加載產品數據
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setErrorMessage(null);
      
      try {
        // 獲取產品詳情
        const productRes = await fetch(`/api/products/${productId}`);
        
        if (!productRes.ok) {
          throw new Error(`獲取產品詳情失敗: ${productRes.status}`);
        }
        
        const productData = await productRes.json();
        setProduct(productData);
        
        // 初始化表單數據
        setFormData({
          name: productData.name || '',
          description: productData.description || '',
          category: productData.category_id?.toString() || '',
          price: productData.price?.toString() || '',
          discountPrice: productData.discountPrice?.toString() || '',
          stockQuantity: productData.stockQuantity?.toString() || '',
          sku: productData.sku || '',
          weight: productData.weight?.toString() || '',
          dimensions: productData.dimensions || '',
          featured: !!productData.featured,
          sizes: productData.sizes?.map((s: any) => s.id) || [],
        });
        
        // 獲取分類
        const categoriesRes = await fetch('/api/categories');
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
        
        // 獲取尺寸
        const sizesRes = await fetch('/api/sizes');
        if (sizesRes.ok) {
          const sizesData = await sizesRes.json();
          setAllSizes(sizesData);
        } else {
          // 使用預設尺寸
          setAllSizes([
            { id: 1, size: 'XS' },
            { id: 2, size: 'S' },
            { id: 3, size: 'M' },
            { id: 4, size: 'L' },
            { id: 5, size: 'XL' },
            { id: 6, size: 'XXL' },
          ]);
        }
      } catch (error) {
        console.error('加載產品數據錯誤:', error);
        setErrorMessage('加載產品數據時發生錯誤，請重試');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, [productId]);
  
  // 處理表單輸入變更
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 處理複選框變更
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name === 'featured') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (name === 'sizes') {
      // 處理尺寸複選框
      const sizeId = parseInt(e.target.value);
      setFormData(prev => {
        if (checked) {
          // 添加尺寸
          return {
            ...prev,
            sizes: [...prev.sizes, sizeId]
          };
        } else {
          // 移除尺寸
          return {
            ...prev,
            sizes: prev.sizes.filter(id => id !== sizeId)
          };
        }
      });
    }
  };
  
  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage(null);
    
    try {
      // 構建FormData
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('price', formData.price);
      submitData.append('discountPrice', formData.discountPrice);
      submitData.append('stockQuantity', formData.stockQuantity);
      submitData.append('sku', formData.sku);
      submitData.append('weight', formData.weight);
      submitData.append('dimensions', formData.dimensions);
      submitData.append('featured', formData.featured.toString());
      submitData.append('sizes', JSON.stringify(formData.sizes));
      
      // 發送更新請求
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        body: submitData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '產品更新失敗');
      }
      
      // 更新成功
      router.push('/admin/products');
    } catch (error: any) {
      console.error('更新產品錯誤:', error);
      setErrorMessage(error.message || '更新產品時發生錯誤');
    } finally {
      setIsSaving(false);
    }
  };
  
  // 加載中顯示
  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-indigo-600"></div>
          <p className="mt-2 text-gray-600">加載產品數據...</p>
        </div>
      </div>
    );
  }
  
  // 發生錯誤
  if (errorMessage) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {errorMessage}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link
              href="/admin/products"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              返回產品列表
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 頂部導航與標題 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              編輯產品
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              ID: {productId} · {formData.sku}
            </p>
          </div>
          <div className="flex space-x-3">
            <Link 
              href={`/admin/products/${productId}/preview`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              預覽
            </Link>
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
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">產品描述</label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">產品分類</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="">請選擇分類</option>
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
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700">原價 (NT$)</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">折扣價 (NT$)</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          name="discountPrice"
                          id="discountPrice"
                          value={formData.discountPrice}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">庫存數量</label>
                      <input
                        type="number"
                        name="stockQuantity"
                        id="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
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
                        value={formData.weight}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">尺寸</label>
                      <input
                        type="text"
                        name="dimensions"
                        id="dimensions"
                        value={formData.dimensions}
                        onChange={handleInputChange}
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
                            checked={formData.sizes.includes(size.id)}
                            onChange={handleCheckboxChange}
                            value={size.id}
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
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">或拖放文件</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                    </div>
                  </div>

                  {/* 現有圖片列表 */}
                  {product.images && product.images.length > 0 && (
                    <div className="space-y-3">
                      {product.images.map((image: any) => (
                        <div key={image.id} className="flex items-center space-x-3 border border-gray-200 rounded-md p-2">
                          <div className="flex-shrink-0 h-14 w-14 bg-gray-100 rounded-md overflow-hidden">
                            <img src={image.url} alt="" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {image.isPrimary && 
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                  主圖
                                </span>
                              }
                              圖片 {image.id}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              順序: {image.sortOrder + 1}
                            </p>
                          </div>
                          <div className="flex-shrink-0 flex space-x-1">
                            {!image.isPrimary && (
                              <button
                                type="button"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                設為主圖
                              </button>
                            )}
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-900"
                            >
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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
                disabled={isSaving}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSaving ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSaving ? '儲存中...' : '儲存變更'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 