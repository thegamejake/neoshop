"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function PromotionsManagement() {
  // 模擬促銷活動數據，實際應用中應從API獲取
  const promotionsData = [
    {
      id: 1,
      name: '夏季特賣',
      type: '折扣',
      code: 'SUMMER23',
      discount: '20%',
      applicableProducts: '所有夏季商品',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      status: '已結束',
      usageCount: 342
    },
    {
      id: 2,
      name: '新會員優惠',
      type: '折扣',
      code: 'NEWMEMBER',
      discount: '10%',
      applicableProducts: '所有商品',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: '進行中',
      usageCount: 567
    },
    {
      id: 3,
      name: '秋季新品',
      type: '折扣',
      code: 'FALL2023',
      discount: '15%',
      applicableProducts: '秋季新品系列',
      startDate: '2023-09-01',
      endDate: '2023-10-31',
      status: '進行中',
      usageCount: 128
    },
    {
      id: 4,
      name: '免運費',
      type: '免運',
      code: 'FREESHIP',
      discount: '免運費',
      applicableProducts: '訂單滿NT$1,500',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: '進行中',
      usageCount: 890
    },
    {
      id: 5,
      name: '生日優惠',
      type: '禮品',
      code: 'BIRTHDAY',
      discount: '送小禮品',
      applicableProducts: '訂單滿NT$1,000',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: '進行中',
      usageCount: 215
    },
    {
      id: 6,
      name: '黑色星期五',
      type: '折扣',
      code: 'BF2023',
      discount: '30%',
      applicableProducts: '指定商品',
      startDate: '2023-11-24',
      endDate: '2023-11-27',
      status: '未開始',
      usageCount: 0
    },
    {
      id: 7,
      name: '聖誕特賣',
      type: '折扣',
      code: 'XMAS2023',
      discount: '25%',
      applicableProducts: '所有商品',
      startDate: '2023-12-15',
      endDate: '2023-12-25',
      status: '未開始',
      usageCount: 0
    },
    {
      id: 8,
      name: 'VIP會員專屬',
      type: '折扣',
      code: 'VIP2023',
      discount: '15%',
      applicableProducts: '所有商品',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: '進行中',
      usageCount: 432
    },
  ];

  // 定義篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // 應用篩選邏輯到促銷活動列表
  const filteredPromotions = promotionsData.filter(promotion => {
    // 搜索名稱或代碼
    const matchesSearch = promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          promotion.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 類型篩選
    const matchesType = typeFilter === '' || promotion.type === typeFilter;
    
    // 狀態篩選
    const matchesStatus = statusFilter === '' || promotion.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // 複製促銷代碼處理函數
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // 實際應用中，這裡應該顯示一個通知或確認訊息
    console.log(`已複製代碼: ${code}`);
  };

  // 編輯促銷活動處理函數
  const handleEditPromotion = (id: number) => {
    console.log(`編輯促銷活動 ID: ${id}`);
    // 實際應用中，這裡應該導航到編輯頁面
  };

  // 暫停促銷活動處理函數
  const handleTogglePromotion = (id: number, currentStatus: string) => {
    console.log(`${currentStatus === '進行中' ? '暫停' : '啟用'}促銷活動 ID: ${id}`);
    // 實際應用中，這裡應該調用API來更新促銷活動狀態
  };

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-800">促銷活動管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            管理所有促銷活動，包括折扣碼、特價活動和贈品活動。
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            href="/admin/promotions/new"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            新增促銷活動
          </Link>
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <div className="bg-white p-4 border-b border-gray-200">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="搜索促銷活動名稱或代碼..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">所有類型</option>
              <option value="折扣">折扣</option>
              <option value="免運">免運</option>
              <option value="禮品">禮品</option>
              <option value="買一送一">買一送一</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">所有狀態</option>
              <option value="進行中">進行中</option>
              <option value="未開始">未開始</option>
              <option value="已結束">已結束</option>
              <option value="已暫停">已暫停</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  活動名稱
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  類型
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  優惠碼
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  折扣
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  開始日期
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  結束日期
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  狀態
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  使用次數
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredPromotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <Link href={`/admin/promotions/${promotion.id}`} className="text-indigo-600 hover:text-indigo-900">
                      {promotion.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">{promotion.applicableProducts}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{promotion.type}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <div className="flex items-center">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">{promotion.code}</span>
                      <button 
                        onClick={() => handleCopyCode(promotion.code)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{promotion.discount}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{promotion.startDate}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{promotion.endDate}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      promotion.status === '進行中' ? 'bg-green-100 text-green-800' : 
                      promotion.status === '未開始' ? 'bg-blue-100 text-blue-800' : 
                      promotion.status === '已暫停' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {promotion.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {promotion.usageCount}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button 
                      onClick={() => handleEditPromotion(promotion.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      編輯
                    </button>
                    {promotion.status === '進行中' ? (
                      <button 
                        onClick={() => handleTogglePromotion(promotion.id, promotion.status)}
                        className="text-red-600 hover:text-red-900"
                      >
                        暫停
                      </button>
                    ) : promotion.status === '已暫停' && (
                      <button 
                        onClick={() => handleTogglePromotion(promotion.id, promotion.status)}
                        className="text-green-600 hover:text-green-900"
                      >
                        啟用
                      </button>
                    )}
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
                  <span className="font-medium">{filteredPromotions.length}</span> 個項目，共{' '}
                  <span className="font-medium">{promotionsData.length}</span> 個項目
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">總促銷活動</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{promotionsData.length}</div>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">進行中活動</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {promotionsData.filter(item => item.status === '進行中').length}
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
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">未開始活動</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {promotionsData.filter(item => item.status === '未開始').length}
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
              <div className="flex-shrink-0 bg-gray-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">已結束活動</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {promotionsData.filter(item => item.status === '已結束').length}
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