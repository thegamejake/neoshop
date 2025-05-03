"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductsManagement() {
  // 模擬產品數據，實際應用中應從API獲取
  const productsData = [
    {
      id: 1,
      name: '經典簡約白襯衫',
      category: '男裝',
      price: 'NT$ 1,200',
      stock: 42,
      status: '在售',
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: '修身丹寧牛仔褲',
      category: '男裝',
      price: 'NT$ 1,500',
      stock: 23,
      status: '在售',
      sizes: ['M', 'L', 'XL']
    },
    {
      id: 3,
      name: '柔軟針織毛衣',
      category: '女裝',
      price: 'NT$ 1,800',
      stock: 36,
      status: '在售',
      sizes: ['S', 'M', 'L']
    },
    {
      id: 4,
      name: '時尚休閒外套',
      category: '女裝',
      price: 'NT$ 2,200',
      stock: 5,
      status: '低庫存',
      sizes: ['XS', 'S', 'M']
    },
    {
      id: 5,
      name: '皮革手提包',
      category: '配飾',
      price: 'NT$ 3,500',
      stock: 0,
      status: '缺貨',
      sizes: []
    },
    {
      id: 6,
      name: '春季連衣裙',
      category: '女裝',
      price: 'NT$ 2,400',
      stock: 28,
      status: '在售',
      sizes: ['XS', 'S', 'M', 'L']
    },
    {
      id: 7,
      name: '商務西裝套裝',
      category: '男裝',
      price: 'NT$ 6,800',
      stock: 15,
      status: '在售',
      sizes: ['M', 'L', 'XL', 'XXL']
    },
    {
      id: 8,
      name: '運動休閒鞋',
      category: '配飾',
      price: 'NT$ 2,800',
      stock: 12,
      status: '在售',
      sizes: ['M', 'L', 'XL']
    },
  ];

  // 定義篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');

  // 應用篩選邏輯到產品列表
  const filteredProducts = productsData.filter(product => {
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
              filteredProducts.map((product) => (
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
                    <button className="text-red-600 hover:text-red-900">
                      刪除
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center sm:pl-6">
                  沒有找到符合條件的服裝商品
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              上一頁
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              下一頁
            </a>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                顯示 <span className="font-medium">1</span> 到{' '}
                <span className="font-medium">{filteredProducts.length}</span> 共{' '}
                <span className="font-medium">{filteredProducts.length}</span> 個結果
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">上一頁</span>
                  &lt;
                </a>
                <a
                  href="#"
                  aria-current="page"
                  className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  1
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  2
                </a>
                <a
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">下一頁</span>
                  &gt;
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 