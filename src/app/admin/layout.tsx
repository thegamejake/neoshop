import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'NEOFashion Admin',
  description: '服裝電商後台管理系統',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">NEOFashion 管理後台</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">管理員：張小明</span>
            <button
              className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              登出
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-sm">
          <nav className="mt-5 px-2">
            <Link
              href="/admin"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              儀表板
            </Link>
            <Link
              href="/admin/products"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              服裝管理
            </Link>
            <Link
              href="/admin/orders"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              訂單管理
            </Link>
            <Link
              href="/admin/users"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              用戶管理
            </Link>
            <Link
              href="/admin/inventory"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              庫存管理
            </Link>
            <Link
              href="/admin/promotions"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              促銷活動
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 