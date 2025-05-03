import React from 'react';
import { Metadata } from 'next';

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
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">NEOFashion 管理後台</h1>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-white shadow-sm">
          <nav className="mt-5 px-2">
            <a
              href="/admin"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              儀表板
            </a>
            <a
              href="/admin/products"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              服裝管理
            </a>
            <a
              href="/admin/orders"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              訂單管理
            </a>
            <a
              href="/admin/users"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              用戶管理
            </a>
            <a
              href="/admin/inventory"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              庫存管理
            </a>
            <a
              href="/admin/promotions"
              className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-900 hover:bg-gray-100"
            >
              促銷活動
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
} 