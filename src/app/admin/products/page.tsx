"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// 定義產品類型
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  sizes: string[];
}

// 定義錯誤類型
interface ApiError {
  error: string;
  message?: string;
  code?: string;
}

export default function ProductsManagement() {
  // 建立狀態來存儲從API獲取的產品數據
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  // 定義篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  
  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // 刪除相關狀態
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // 從API獲取產品數據
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        
        // 從後端API獲取產品數據
        const response = await fetch('http://localhost:3001/api/products');
        
        const data = await response.json();
        
        if (!response.ok) {
          // 如果API返回錯誤，提取詳細錯誤訊息
          const apiError = data as ApiError;
          throw new Error(
            apiError.error + (apiError.message ? `: ${apiError.message}` : '')
          );
        }
        
        setProducts(data);
        setError(null);
        setErrorDetails(null);
      } catch (err: any) {
        console.error('獲取產品數據錯誤:', err);
        setError('獲取產品數據時發生錯誤');
        setErrorDetails(err.message || '請確認API服務器已啟動，或聯絡系統管理員。');
        // 不再使用模擬數據作為備用
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 應用篩選邏輯到產品列表
  const filteredProducts = products.filter(product => {
    // 搜索名稱
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 分類篩選
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    
    // 狀態篩選
    const matchesStatus = statusFilter === '' || product.status === statusFilter;
    
    // 尺碼篩選
    const matchesSize = sizeFilter === '' || (product.sizes && product.sizes.includes(sizeFilter));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSize;
  });
  
  // 分頁邏輯
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  
  // 換頁處理函數
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // 檢查API服務器狀態
  const checkApiStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/status');
      const data = await response.json();
      
      if (data.dbError) {
        setError('數據庫初始化錯誤');
        setErrorDetails(`錯誤信息: ${data.dbError.message} (錯誤代碼: ${data.dbError.code || 'UNKNOWN'})`);
      } else if (data.status === 'online' && data.dbInitialized) {
        window.location.reload();
      } else {
        setError('API 服務器正在運行，但數據庫尚未初始化');
        setErrorDetails('數據庫正在初始化中，請稍後再試');
      }
    } catch (err) {
      setError('無法連接到 API 服務器');
      setErrorDetails('請確認 API 服務器是否已啟動 (npm run api)');
    }
  };

  // 打開刪除確認對話框
  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
    setDeleteError(null);
  };

  // 關閉刪除確認對話框
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
    setDeleteError(null);
  };

  // 執行刪除
  const confirmDelete = async () => {
    if (!productToDelete) return;
    
    try {
      setIsDeleting(true);
      setDeleteError(null);
      
      const response = await fetch(`/api/products/${productToDelete.id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || '刪除產品失敗');
      }
      
      // 從列表中移除已刪除的產品
      setProducts(products.filter(p => p.id !== productToDelete.id));
      
      // 關閉對話框
      closeDeleteModal();
    } catch (err: any) {
      console.error('刪除產品錯誤:', err);
      setDeleteError(err.message || '刪除產品時發生錯誤');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-800">服裝管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            管理所有服裝商品的列表，包括庫存、價格和狀態。
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            新增服裝
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 p-6 border border-red-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">資料載入失敗</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
                {errorDetails && <p className="mt-1 font-medium">{errorDetails}</p>}
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    onClick={checkApiStatus}
                    className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  >
                    檢查 API 狀態
                  </button>
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="ml-3 rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  >
                    重新整理
                  </button>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="ml-3 rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  >
                    關閉提示
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="搜索服裝..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">所有分類</option>
              <option value="男裝">男裝</option>
              <option value="女裝">女裝</option>
              <option value="配飾">配飾</option>
              <option value="新品">新品上市</option>
              <option value="特價">特價商品</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">所有狀態</option>
              <option value="在售">在售</option>
              <option value="低庫存">低庫存</option>
              <option value="缺貨">缺貨</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
            >
              <option value="">尺碼篩選</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">加載產品數據中...</p>
          </div>
        ) : (
          <>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                商品名稱
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                分類
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                價格
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                庫存
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                狀態
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                尺碼
              </th>
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
              >
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredProducts.length > 0 ? (
                  currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {product.id}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.price}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        product.status === '在售'
                          ? 'bg-green-100 text-green-800'
                          : product.status === '低庫存'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {product.sizes && product.sizes.join(', ')}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      編輯
                    </Link>
                    <button 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => openDeleteModal(product)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                    <td colSpan={8} className="py-8 text-center">
                      <div className="mx-auto max-w-md p-6">
                        {error ? (
                          <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-base font-semibold text-gray-900">無法載入產品數據</h3>
                            <p className="mt-1 text-sm text-gray-500">請確認API服務器已啟動，並檢查網絡連接。</p>
                            {errorDetails && (
                              <p className="mt-2 max-w-md mx-auto text-xs text-red-500 bg-red-50 p-2 rounded-md">
                                {errorDetails}
                              </p>
                            )}
                            <div className="mt-6">
                              <button
                                type="button"
                                onClick={checkApiStatus}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2"
                              >
                                檢查 API 狀態
                              </button>
                              <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                重新嘗試
                              </button>
                            </div>
                          </div>
                        ) : (
                          searchTerm || categoryFilter || statusFilter || sizeFilter ? (
                            <div className="text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                              <h3 className="mt-2 text-base font-semibold text-gray-900">沒有找到符合條件的商品</h3>
                              <p className="mt-1 text-sm text-gray-500">請嘗試使用不同的搜索條件或清除篩選。</p>
                              <div className="mt-6">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSearchTerm('');
                                    setCategoryFilter('');
                                    setStatusFilter('');
                                    setSizeFilter('');
                                  }}
                                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  清除篩選條件
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                              <h3 className="mt-2 text-base font-semibold text-gray-900">尚無商品數據</h3>
                              <p className="mt-1 text-sm text-gray-500">請先添加產品到資料庫。</p>
                              <div className="mt-6">
                                <Link
                                  href="/admin/products/new"
                                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                  新增商品
                                </Link>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  上一頁
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages || totalPages === 0
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  下一頁
                </button>
          </div>
              {filteredProducts.length > 0 && (
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                      顯示 <span className="font-medium">{indexOfFirstItem + 1}</span> 到{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastItem, filteredProducts.length)}
                      </span> 共{' '}
                <span className="font-medium">{filteredProducts.length}</span> 個結果
              </p>
            </div>
                  {totalPages > 1 && (
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                >
                  <span className="sr-only">上一頁</span>
                  &lt;
                        </button>
                        
                        {/* 動態生成頁碼按鈕 */}
                        {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                          // 計算要顯示的頁碼
                          let pageNumber: number;
                          
                          if (totalPages <= 5) {
                            // 總頁數少於等於5，直接顯示所有頁碼
                            pageNumber = index + 1;
                          } else if (currentPage <= 3) {
                            // 當前頁在前3頁，顯示1-5頁
                            pageNumber = index + 1;
                          } else if (currentPage >= totalPages - 2) {
                            // 當前頁在後3頁，顯示最後5頁
                            pageNumber = totalPages - 4 + index;
                          } else {
                            // 當前頁在中間，顯示當前頁及其前後2頁
                            pageNumber = currentPage - 2 + index;
                          }
                          
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              aria-current={currentPage === pageNumber ? 'page' : undefined}
                              className={`${
                                currentPage === pageNumber
                                  ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              } relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages || totalPages === 0}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages || totalPages === 0
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                >
                  <span className="sr-only">下一頁</span>
                  &gt;
                        </button>
              </nav>
            </div>
                  )}
          </div>
              )}
        </div>
          </>
        )}
      </div>

      {/* 刪除確認對話框 */}
      {deleteModalOpen && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full p-6 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                確認刪除
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  您確定要刪除產品「{productToDelete?.name}」嗎？此操作無法撤銷，產品相關的所有數據（包括尺碼、圖片等）都將被永久刪除。
                </p>
                
                {deleteError && (
                  <div className="mt-2 p-2 bg-red-50 text-red-800 text-sm rounded">
                    錯誤: {deleteError}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              disabled={isDeleting}
              onClick={confirmDelete}
              className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                isDeleting ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
              }`}
            >
              {isDeleting ? '刪除中...' : '確認刪除'}
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={closeDeleteModal}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 