"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// 定義庫存項目類型
interface InventoryItem {
  id: number;
  productId: number;
  productName: string;
  size: string;
  quantity: number;
  status: string;
  location: string;
  lastUpdated: string;
}

export default function InventoryManagement() {
  // 模擬庫存數據，實際應用中應從API獲取
  const inventoryData: InventoryItem[] = [
    {
      id: 1,
      productId: 1,
      productName: '經典簡約白襯衫',
      size: 'S',
      quantity: 10,
      status: '正常',
      location: 'A-01-01',
      lastUpdated: '2023-08-15'
    },
    {
      id: 2,
      productId: 1,
      productName: '經典簡約白襯衫',
      size: 'M',
      quantity: 15,
      status: '正常',
      location: 'A-01-02',
      lastUpdated: '2023-08-15'
    },
    {
      id: 3,
      productId: 1,
      productName: '經典簡約白襯衫',
      size: 'L',
      quantity: 12,
      status: '正常',
      location: 'A-01-03',
      lastUpdated: '2023-08-15'
    },
    {
      id: 4,
      productId: 1,
      productName: '經典簡約白襯衫',
      size: 'XL',
      quantity: 5,
      status: '低庫存',
      location: 'A-01-04',
      lastUpdated: '2023-08-15'
    },
    {
      id: 5,
      productId: 2,
      productName: '修身丹寧牛仔褲',
      size: 'M',
      quantity: 8,
      status: '正常',
      location: 'A-02-01',
      lastUpdated: '2023-08-10'
    },
    {
      id: 6,
      productId: 2,
      productName: '修身丹寧牛仔褲',
      size: 'L',
      quantity: 6,
      status: '低庫存',
      location: 'A-02-02',
      lastUpdated: '2023-08-10'
    },
    {
      id: 7,
      productId: 2,
      productName: '修身丹寧牛仔褲',
      size: 'XL',
      quantity: 9,
      status: '正常',
      location: 'A-02-03',
      lastUpdated: '2023-08-10'
    },
    {
      id: 8,
      productId: 3,
      productName: '柔軟針織毛衣',
      size: 'S',
      quantity: 12,
      status: '正常',
      location: 'B-01-01',
      lastUpdated: '2023-08-05'
    },
    {
      id: 9,
      productId: 3,
      productName: '柔軟針織毛衣',
      size: 'M',
      quantity: 15,
      status: '正常',
      location: 'B-01-02',
      lastUpdated: '2023-08-05'
    },
    {
      id: 10,
      productId: 3,
      productName: '柔軟針織毛衣',
      size: 'L',
      quantity: 9,
      status: '正常',
      location: 'B-01-03',
      lastUpdated: '2023-08-05'
    },
    {
      id: 11,
      productId: 4,
      productName: '時尚休閒外套',
      size: 'XS',
      quantity: 2,
      status: '低庫存',
      location: 'B-02-01',
      lastUpdated: '2023-07-28'
    },
    {
      id: 12,
      productId: 4,
      productName: '時尚休閒外套',
      size: 'S',
      quantity: 1,
      status: '極低庫存',
      location: 'B-02-02',
      lastUpdated: '2023-07-28'
    },
    {
      id: 13,
      productId: 4,
      productName: '時尚休閒外套',
      size: 'M',
      quantity: 2,
      status: '低庫存',
      location: 'B-02-03',
      lastUpdated: '2023-07-28'
    },
    {
      id: 14,
      productId: 5,
      productName: '皮革手提包',
      size: 'One Size',
      quantity: 0,
      status: '缺貨',
      location: 'C-01-01',
      lastUpdated: '2023-07-20'
    },
  ];

  // 定義篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // 應用篩選邏輯到庫存列表
  const filteredInventory = inventoryData.filter(item => {
    // 搜索名稱
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 尺碼篩選
    const matchesSize = sizeFilter === '' || item.size === sizeFilter;
    
    // 狀態篩選
    const matchesStatus = statusFilter === '' || item.status === statusFilter;
    
    // 位置篩選
    const matchesLocation = locationFilter === '' || item.location.includes(locationFilter);
    
    return matchesSearch && matchesSize && matchesStatus && matchesLocation;
  });

  // 用於更新庫存數量的函數
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState('');

  const handleEditClick = (item: InventoryItem) => {
    setEditingItem(item.id);
    setNewQuantity(item.quantity.toString());
  };

  const handleSaveClick = (itemId: number) => {
    // 實際應用中，這裡應該調用API來更新庫存
    console.log(`更新庫存項目 ${itemId} 數量為 ${newQuantity}`);
    
    // 更新本地狀態以模擬API調用結果
    const updatedInventory = inventoryData.map(item => {
      if (item.id === itemId) {
        const quantity = parseInt(newQuantity, 10);
        let status = item.status;
        
        if (quantity === 0) status = '缺貨';
        else if (quantity <= 2) status = '極低庫存';
        else if (quantity <= 5) status = '低庫存';
        else status = '正常';
        
        return { ...item, quantity, status, lastUpdated: new Date().toISOString().split('T')[0] };
      }
      return item;
    });
    
    // 重置編輯狀態
    setEditingItem(null);
  };

  const handleCancelClick = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-800">庫存管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            管理所有產品的庫存狀態，包括數量、位置和最後更新時間。
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            匯出庫存報表
          </button>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="搜索產品名稱..."
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border flex-1 min-w-[200px]"
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
              <option value="One Size">單一尺碼</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">所有狀態</option>
              <option value="正常">正常</option>
              <option value="低庫存">低庫存</option>
              <option value="極低庫存">極低庫存</option>
              <option value="缺貨">缺貨</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">所有位置</option>
              <option value="A">A區</option>
              <option value="B">B區</option>
              <option value="C">C區</option>
            </select>
          </div>
        </div>

        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                ID
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                產品名稱
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                尺碼
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                數量
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                狀態
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                位置
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                最後更新
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {item.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.productName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.size}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {editingItem === item.id ? (
                      <input
                        type="number"
                        min="0"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-1 border"
                      />
                    ) : (
                      item.quantity
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        item.status === '正常'
                          ? 'bg-green-100 text-green-800'
                          : item.status === '低庫存'
                          ? 'bg-yellow-100 text-yellow-800'
                          : item.status === '極低庫存'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.location}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    {editingItem === item.id ? (
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleSaveClick(item.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          保存
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelClick}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          取消
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => handleEditClick(item)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          編輯
                        </button>
                        <Link
                          href={`/admin/products/${item.productId}`}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          產品詳情
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-4 text-center text-sm text-gray-500">
                  沒有找到符合條件的庫存項目
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">庫存統計</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">庫存數量和狀態的快速概覽</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">總庫存項目</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{inventoryData.length}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">總庫存數量</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {inventoryData.reduce((sum, item) => sum + item.quantity, 0)}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">缺貨項目</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {inventoryData.filter(item => item.status === '缺貨').length}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">低庫存項目</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {inventoryData.filter(item => item.status === '低庫存' || item.status === '極低庫存').length}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
} 