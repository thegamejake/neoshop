import React from 'react';
import Link from 'next/link';

export default async function NewProduct() {
  // 空白產品表單初始狀態
  const emptyProduct = {
    name: '',
    description: '',
    price: 0,
    discountPrice: 0,
    categoryId: 1,
    stockQuantity: 0,
    sku: '',
    weight: 0.0,
    dimensions: '',
    featured: false,
    sizes: [],
    images: [],
  };

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

        <form className="space-y-6">
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
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">產品分類</label>
                      <select
                        id="category"
                        name="category"
                        defaultValue={emptyProduct.categoryId}
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
                          placeholder="0"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          required
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
                          placeholder="0"
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
                        placeholder="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center">
                    <input
                      id="featured"
                      name="featured"
                      type="checkbox"
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
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                        </label>
                        <p className="pl-1">或拖放文件</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF 最大 10MB</p>
                    </div>
                  </div>

                  {/* 已上傳圖片預覽區域 - 初始為空 */}
                  <div className="space-y-3" id="image-preview-container">
                    {/* 上傳的圖片將顯示在此處 */}
                    <p className="text-sm text-gray-500 text-center py-2">尚未上傳圖片</p>
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
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                建立產品
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 