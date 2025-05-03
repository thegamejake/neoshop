import React from 'react';

export default function AdminDashboard() {
  // 這裡可以連接實際的數據
  const stats = [
    { name: '總訂單', value: '324' },
    { name: '本月銷售額', value: 'NT$ 168,950' },
    { name: '註冊會員', value: '573' },
    { name: '服裝款式', value: '98' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-5">服裝銷售儀表板</h2>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {stat.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {stat.value}
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900">最近訂單</h3>
            <div className="mt-6">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        訂單編號
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        客戶
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        金額
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        狀態
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: '1001', customer: '王小明', amount: 'NT$ 2,800', status: '已付款' },
                      { id: '1002', customer: '陳大文', amount: 'NT$ 1,590', status: '處理中' },
                      { id: '1003', customer: '李小華', amount: 'NT$ 4,200', status: '已發貨' },
                    ].map((order) => (
                      <tr key={order.id}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">#{order.id}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900">熱門服飾</h3>
            <div className="mt-6">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        服飾名稱
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        庫存
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        價格
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        銷量
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: '經典簡約白襯衫', stock: 42, price: 'NT$ 1,200', sales: 86 },
                      { name: '修身丹寧牛仔褲', stock: 23, price: 'NT$ 1,500', sales: 124 },
                      { name: '柔軟針織毛衣', stock: 36, price: 'NT$ 1,800', sales: 67 },
                      { name: '時尚休閒外套', stock: 18, price: 'NT$ 2,200', sales: 53 },
                    ].map((product, idx) => (
                      <tr key={idx}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 服裝分類銷售統計 */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-base font-semibold text-gray-900">分類銷售統計</h3>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5">
                <dt className="truncate text-sm font-medium text-gray-500">男裝銷售</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">NT$ 64,250</dd>
                <p className="mt-2 text-sm text-green-600">↑ 12% 較上月</p>
              </div>
              <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5">
                <dt className="truncate text-sm font-medium text-gray-500">女裝銷售</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">NT$ 89,350</dd>
                <p className="mt-2 text-sm text-green-600">↑ 18% 較上月</p>
              </div>
              <div className="overflow-hidden rounded-lg bg-gray-50 px-4 py-5">
                <dt className="truncate text-sm font-medium text-gray-500">配飾銷售</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">NT$ 15,350</dd>
                <p className="mt-2 text-sm text-green-600">↑ 8% 較上月</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}