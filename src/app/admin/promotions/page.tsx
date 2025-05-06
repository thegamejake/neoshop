"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// 定義促銷活動類型
interface Promotion {
  id: number;
  name: string;
  type: '折扣券' | '滿額折扣' | '限時特價' | '買一送一' | '會員專屬';
  code?: string;
  discount: string;
  startDate: string;
  endDate: string;
  status: '進行中' | '已結束' | '即將開始' | '已停用';
  appliedProducts: string;
  usageCount: number;
  usageLimit?: number;
}

export default function PromotionsManagement() {
  // 模擬促銷活動數據
  const promotionsData: Promotion[] = [
    {
      id: 1,
      name: '新會員首購優惠',
      type: '折扣券',
      code: 'NEWUSER2023',
      discount: '85折',
      startDate: '2023-07-01',
      endDate: '2023-12-31',
      status: '進行中',
      appliedProducts: '全部商品',
      usageCount: 245,
      usageLimit: 1000
    },
    {
      id: 2,
      name: '夏季特賣活動',
      type: '限時特價',
      discount: '7折起',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      status: '已結束',
      appliedProducts: '夏季商品',
      usageCount: 1200
    },
    {
      id: 3,
      name: '中秋節優惠',
      type: '滿額折扣',
      code: 'MOON2023',
      discount: '滿2000元折300元',
      startDate: '2023-09-15',
      endDate: '2023-09-30',
      status: '已結束',
      appliedProducts: '全部商品',
      usageCount: 350
    },
    {
      id: 4,
      name: '會員感謝週',
      type: '會員專屬',
      discount: '9折',
      startDate: '2023-10-01',
      endDate: '2023-10-07',
      status: '已結束',
      appliedProducts: '全部商品',
      usageCount: 520
    },
    {
      id: 5,
      name: '買衣送褲',
      type: '買一送一',
      discount: '買上衣送褲子',
      startDate: '2023-11-01',
      endDate: '2023-11-15',
      status: '已結束',
      appliedProducts: '指定商品',
      usageCount: 180
    },
    {
      id: 6,
      name: '雙11大促',
      type: '限時特價',
      discount: '5折起',
      startDate: '2023-11-11',
      endDate: '2023-11-11',
      status: '已結束',
      appliedProducts: '指定商品',
      usageCount: 890
    },
    {
      id: 7,
      name: '耶誕節特惠',
      type: '滿額折扣',
      code: 'XMAS2023',
      discount: '滿3000元折500元',
      startDate: '2023-12-15',
      endDate: '2023-12-25',
      status: '進行中',
      appliedProducts: '全部商品',
      usageCount: 215
    },
    {
      id: 8,
      name: '週年慶',
      type: '折扣券',
      code: 'ANNIV2023',
      discount: '8折',
      startDate: '2023-09-01',
      endDate: '2023-09-30',
      status: '已結束',
      appliedProducts: '全部商品',
      usageCount: 780
    },
    {
      id: 9,
      name: '新春優惠',
      type: '限時特價',
      discount: '8折起',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: '即將開始',
      appliedProducts: '新春系列',
      usageCount: 0
    },
    {
      id: 10,
      name: 'VIP尊享折扣',
      type: '會員專屬',
      discount: '85折',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      status: '進行中',
      appliedProducts: '全部商品',
      usageCount: 1450
    }
  ];

  // 定義篩選狀態
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // 應用篩選邏輯到促銷活動列表
  const filteredPromotions = promotionsData.filter(promotion => {
    // 搜索名稱或代碼
    const matchesSearch = promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (promotion.code && promotion.code.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // 類型篩選
    const matchesType = typeFilter === '' || promotion.type === typeFilter;
    
    // 狀態篩選
    const matchesStatus = statusFilter === '' || promotion.status === statusFilter;
    
    // 日期篩選
    const now = new Date();
    const isActive = new Date(promotion.startDate) <= now && new Date(promotion.endDate) >= now;
    const isUpcoming = new Date(promotion.startDate) > now;
    const isExpired = new Date(promotion.endDate) < now;
    
    let matchesDate = true;
    if (dateFilter === '進行中') {
      matchesDate = isActive;
    } else if (dateFilter === '即將開始') {
      matchesDate = isUpcoming;
    } else if (dateFilter === '已結束') {
      matchesDate = isExpired;
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  // 切換促銷活動狀態
  const toggleStatus = (id: number) => {
    console.log(`切換促銷活動 ${id} 的狀態`);
    // 實際應用中，這裡應該調用API來更新促銷活動狀態
  };

  // 刪除促銷活動
  const deletePromotion = (id: number) => {
    console.log(`刪除促銷活動 ${id}`);
    // 實際應用中，這裡應該調用API來刪除促銷活動
  };

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-800">促銷活動管理</h2>
          <p className="mt-2 text-sm text-gray-600">
            管理所有促銷活動，包括折扣優惠券、限時特價和會員專屬優惠。
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
          <div className="flex gap-3 flex-wrap">
            <input
              type="text"
              placeholder="搜索活動名稱或代碼..."
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border flex-1 min-w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">所有類型</option>
              <option value="折扣券">折扣券</option>
              <option value="滿額折扣">滿額折扣</option>
              <option value="限時特價">限時特價</option>
              <option value="買一送一">買一送一</option>
              <option value="會員專屬">會員專屬</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">所有狀態</option>
              <option value="進行中">進行中</option>
              <option value="已結束">已結束</option>
              <option value="即將開始">即將開始</option>
              <option value="已停用">已停用</option>
            </select>
            <select 
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="">所有時間</option>
              <option value="進行中">當前活動</option>
              <option value="即將開始">即將開始</option>
              <option value="已結束">已結束</option>
            </select>
          </div>
        </div>

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
                優惠內容
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                活動日期
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                狀態
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                使用次數
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredPromotions.length > 0 ? (
              filteredPromotions.map((promotion) => (
                <tr key={promotion.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    <div>{promotion.name}</div>
                    {promotion.code && (
                      <div className="text-xs text-gray-500">代碼: {promotion.code}</div>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {promotion.type}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {promotion.discount}
                    <div className="text-xs text-gray-400">
                      適用: {promotion.appliedProducts}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {promotion.startDate} 至 {promotion.endDate}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        promotion.status === '進行中'
                          ? 'bg-green-100 text-green-800'
                          : promotion.status === '即將開始'
                          ? 'bg-blue-100 text-blue-800'
                          : promotion.status === '已停用'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {promotion.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {promotion.usageCount}
                    {promotion.usageLimit && (
                      <span className="text-xs text-gray-400"> / {promotion.usageLimit}</span>
                    )}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex space-x-3 justify-end">
                      <Link
                        href={`/admin/promotions/${promotion.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        編輯
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleStatus(promotion.id)}
                        className={`${
                          promotion.status === '已停用' ? 'text-green-600 hover:text-green-900' : 'text-orange-600 hover:text-orange-900'
                        }`}
                      >
                        {promotion.status === '已停用' ? '啟用' : '停用'}
                      </button>
                      <button
                        type="button"
                        onClick={() => deletePromotion(promotion.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-sm text-gray-500">
                  沒有找到符合條件的促銷活動
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    進行中活動
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {promotionsData.filter(p => p.status === '進行中').length}
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
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    即將開始活動
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {promotionsData.filter(p => p.status === '即將開始').length}
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
              <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    累計使用次數
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {promotionsData.reduce((sum, item) => sum + item.usageCount, 0)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">熱門促銷活動排行</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">根據使用次數排名</p>
          </div>
          <Link href="/admin/reports/promotions" className="text-sm text-indigo-600 hover:text-indigo-900">
            查看詳細報表
          </Link>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {[...promotionsData]
              .sort((a, b) => b.usageCount - a.usageCount)
              .slice(0, 5)
              .map((promotion) => (
                <li key={promotion.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-indigo-600 truncate">
                      {promotion.name}
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {promotion.usageCount} 次使用
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <div className="flex items-center text-sm text-gray-500">
                        {promotion.type} | {promotion.discount}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      {promotion.startDate} 至 {promotion.endDate}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 