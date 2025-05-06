"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: '',
    general: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // 清除錯誤提示
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeTerms: '',
      general: ''
    };

    // 驗證姓名
    if (!formData.name.trim()) {
      newErrors.name = '請輸入姓名';
      valid = false;
    }

    // 驗證電子郵件
    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '請輸入有效的電子郵件地址';
      valid = false;
    }

    // 驗證密碼
    if (!formData.password) {
      newErrors.password = '請輸入密碼';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '密碼長度至少為8個字符';
      valid = false;
    }

    // 驗證確認密碼
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '請確認密碼';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '兩次輸入的密碼不一致';
      valid = false;
    }

    // 驗證是否同意條款
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '請同意服務條款與隱私政策';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 模擬 API 請求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 在實際應用中，這裡將註冊用戶並處理登入
      console.log('註冊資料:', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      // 導航到登入頁面
      router.push('/auth/login');
    } catch (error) {
      console.error('註冊失敗', error);
      setErrors(prev => ({
        ...prev,
        general: '註冊時發生錯誤，請稍後再試'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="h-16 w-16 relative">
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-indigo-600">
                NEO
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">註冊新帳戶</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            已經有帳戶？{' '}
            <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              登入
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{errors.general}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">姓名</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border ${
                    errors.name ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                  } text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm`}
                  placeholder="姓名"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">電子郵件</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border ${
                    errors.email ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                  } text-gray-900 focus:outline-none focus:z-10 sm:text-sm`}
                  placeholder="電子郵件"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">密碼</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border ${
                    errors.password ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                  } text-gray-900 focus:outline-none focus:z-10 sm:text-sm`}
                  placeholder="密碼"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">確認密碼</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border ${
                    errors.confirmPassword ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                  } text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm`}
                  placeholder="確認密碼"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="agreeTerms"
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${
                errors.agreeTerms ? 'border-red-300' : ''
              }`}
            />
            <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-900">
              我同意 <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">服務條款</a> 和 <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">隱私政策</a>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  註冊中...
                </>
              ) : (
                '註冊'
              )}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-sm">
              <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                返回首頁
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 