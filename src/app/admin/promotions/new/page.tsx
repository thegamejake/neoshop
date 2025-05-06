"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPromotion() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    type: '折扣券',
    code: '',
    discount: '',
    startDate: '',
    endDate: '',
    appliedProducts: '全部商品',
    usageLimit: ''
  });

  const [errors, setErrors] = useState({
    name: false,
    discount: false,
    startDate: false,
    endDate: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // 清除錯誤提示
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name,
      discount: !formData.discount,
      startDate: !formData.startDate,
      endDate: !formData.endDate
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // 模擬 API 調用
    console.log('提交促銷活動資料:', formData);
    
    // 提交成功後導航回促銷活動列表
    router.push('/admin/promotions');
  };

  return (
    <div>
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-semibold text-gray-800">新增促銷活動</h2>
          <p className="mt-2 text-sm text-gray-600">
            創建新的促銷活動，包括折扣優惠券、限時特價和會員專屬優惠。
          </p>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  活動名稱 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="例：新會員首購優惠"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">請輸入活動名稱</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  活動類型
                </label>
                <div className="mt-1">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="折扣券">折扣券</option>
                    <option value="滿額折扣">滿額折扣</option>
                    <option value="限時特價">限時特價</option>
                    <option value="買一送一">買一送一</option>
                    <option value="會員專屬">會員專屬</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  優惠碼
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="code"
                    id="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="例：SUMMER2023"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    {formData.type === '限時特價' ? '限時特價不需要優惠碼' : '可選，留空則系統自動生成'}
                  </p>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                  優惠內容 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="discount"
                    id="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.discount ? 'border-red-500' : ''
                    }`}
                    placeholder="例：85折，滿2000元折300元"
                  />
                  {errors.discount && (
                    <p className="mt-1 text-sm text-red-500">請輸入優惠內容</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  開始日期 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.startDate ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-sm text-red-500">請選擇開始日期</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  結束日期 <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                      errors.endDate ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-sm text-red-500">請選擇結束日期</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="appliedProducts" className="block text-sm font-medium text-gray-700">
                  適用商品
                </label>
                <div className="mt-1">
                  <select
                    id="appliedProducts"
                    name="appliedProducts"
                    value={formData.appliedProducts}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="全部商品">全部商品</option>
                    <option value="指定商品">指定商品</option>
                    <option value="夏季商品">夏季系列</option>
                    <option value="新品上市">新品上市</option>
                    <option value="特價商品">特價商品</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700">
                  使用次數限制
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="usageLimit"
                    id="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    min="0"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="不限制請留空"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    可選，留空表示不限制使用次數
                  </p>
                </div>
              </div>

              {formData.appliedProducts === '指定商品' && (
                <div className="sm:col-span-6">
                  <label htmlFor="productList" className="block text-sm font-medium text-gray-700">
                    指定商品清單
                  </label>
                  <div className="mt-1">
                    <p className="text-sm text-gray-500 mb-2">
                      勾選適用此促銷活動的商品
                    </p>
                    <div className="border border-gray-300 rounded-md max-h-60 overflow-y-auto p-2">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="product1"
                            name="product1"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="product1" className="font-medium text-gray-700">
                            經典簡約白襯衫
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <div className="flex h-5 items-center">
                          <input
                            id="product2"
                            name="product2"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="product2" className="font-medium text-gray-700">
                            修身丹寧牛仔褲
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <div className="flex h-5 items-center">
                          <input
                            id="product3"
                            name="product3"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="product3" className="font-medium text-gray-700">
                            柔軟針織毛衣
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <div className="flex h-5 items-center">
                          <input
                            id="product4"
                            name="product4"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="product4" className="font-medium text-gray-700">
                            時尚休閒外套
                          </label>
                        </div>
                      </div>

                      <div className="flex items-start mt-2">
                        <div className="flex h-5 items-center">
                          <input
                            id="product5"
                            name="product5"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="product5" className="font-medium text-gray-700">
                            皮革手提包
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <Link
              href="/admin/promotions"
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
            >
              取消
            </Link>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              創建促銷活動
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 