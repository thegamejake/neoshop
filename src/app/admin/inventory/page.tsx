"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function InventoryManagement() {
  // 模擬庫存數據，實際應用中應從API獲取
  const inventoryData = [
    {
      id: 1,
      productId: 1,
      productName: '經典簡約白襯衫',
      sku: 'WS-CL-WHT-M',
      size: 'M',
      color: '白色',
      quantity: 15,
      location: 'A-101',
      lastUpdated: '2023-09-15',
      status: '正常'
    },
    {
      id: 2,
      productId: 1,
      productName: '經典簡約白襯衫',
      sku: 'WS-CL-WHT-L',
      size: 'L',
      color: '白色',
      quantity: 12,
      location: 'A-101',
      lastUpdated: '2023-09-15',
      status: '正常'
    },
    {
      id: 3,
      productId: 1,
      productName: '經典簡約白襯衫',
      sku: 'WS-CL-WHT-XL',
      size: 'XL',
      color: '白色',
      quantity: 8,
      location: 'A-102',
      lastUpdated: '2023-09-15',
      status: '正常'
    },
    {
      id: 4,
      productId: 2,
      productName: '修身丹寧牛仔褲',
      sku: 'JP-SM-BLU-M',
      size: 'M',
      color: '藍色',
      quantity: 7,
      location: 'B-201',
      lastUpdated: '2023-09-10',
      status: '正常'
    },
    {
      id: 5,
      productId: 2,
      productName: '修身丹寧牛仔褲',
      sku: 'JP-SM-BLU-L',
      size: 'L',
      color: '藍色',
      quantity: 10,
      location: 'B-201',
      lastUpdated: '2023-09-10',
      status: '正常'
    },
    {
      id: 6,
      productId: 3,
      productName: '柔軟針織毛衣',
      sku: 'SW-KN-RED-S',
      size: 'S',
      color: '紅色',
      quantity: 3,
      location: 'C-301',
      lastUpdated: '2023-09-05',
      status: '低庫存'
    },
    {
      id: 7,
      productId: 4,
      productName: '時尚休閒外套',
      sku: 'JK-CS-BLK-S',
      size: 'S',
      color: '黑色',
      quantity: 0,
      location: 'D-401',
      lastUpdated: '2023-08-28',
      status: '缺貨'
    },
    {
      id: 8,
      productId: 6,
      productName: '春季連衣裙',
      sku: 'DR-SP-PNK-M',
      size: 'M',
      color: '粉色',
      quantity: 12,
      location: 'E-501',
      lastUpdated: '2023-09-12',
      status: '正常'
    },
  ];

  // 定義篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // 應用篩選邏輯到庫存列表
  const filteredInventory = inventoryData.filter(item => {
    // 搜索名稱或SKU
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 尺碼篩選
    const matchesSize = sizeFilter === '' || item.size === sizeFilter;
    
    // 狀態篩選
    const matchesStatus = statusFilter === '' || item.status === statusFilter;
    
    // 倉位篩選
    const matchesLocation = locationFilter === '' || item.location.startsWith(locationFilter);
    
    return matchesSearch && matchesSize && matchesStatus && matchesLocation;
  });

  // 庫存調整處理函數
  const handleAdjustInventory = (id: number) => {
    console.log(`調整庫存項目 ID: ${id}`);
    // 實際應用中，這裡應該打開一個模態框來調整庫存
  };

  // 庫存移動處理函數
  const handleMoveInventory = (id: number) => {
    console.log(`移動庫存項目 ID: ${id}`);
    // 實際應用中，這裡應該打開一個模態框來移動庫存位置
  };

  // 獲取所有倉位
  const allLocations = Array.from(new Set(inventoryData.map(item => item.location.split('-')[0])));

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-800">庫存管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            管理所有商品庫存，包括數量、位置和狀態。
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-2">
          <button
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            批量調整
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            導出報表
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="搜索商品名稱或SKU..."
              className="block w-full md:w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
            >
              <option value="">所有尺碼</option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">所有狀態</option>
              <option value="正常">正常</option>
              <option value="低庫存">低庫存</option>
              <option value="缺貨">缺貨</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">所有倉位</option>
              {allLocations.map(location => (
                <option key={location} value={location}>{location}區</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  SKU
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  商品名稱
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  尺碼
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  顏色
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  數量
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  倉位
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  最後更新
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  狀態
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {item.sku}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <Link href={`/admin/products/${item.productId}`} className="text-indigo-600 hover:text-indigo-900">
                      {item.productName}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.size}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.color}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={`font-medium ${item.quantity === 0 ? 'text-red-600' : (item.quantity <= 5 ? 'text-yellow-600' : 'text-green-600')}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.location}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.lastUpdated}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      item.status === '正常' ? 'bg-green-100 text-green-800' : 
                      item.status === '低庫存' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button 
                      onClick={() => handleAdjustInventory(item.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      調整
                    </button>
                    <button 
                      onClick={() => handleMoveInventory(item.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      移動
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
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
                  <span className="font-medium">{filteredInventory.length}</span> 個項目，共{' '}
                  <span className="font-medium">{inventoryData.length}</span> 個項目
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">上一頁</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">下一頁</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 統計摘要卡片 */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">總庫存商品</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{inventoryData.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">庫存正常商品</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {inventoryData.filter(item => item.status === '正常').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">低庫存商品</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {inventoryData.filter(item => item.status === '低庫存').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">缺貨商品</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {inventoryData.filter(item => item.status === '缺貨').length}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 