"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get('registered') === 'true';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    auth: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(isRegistered);

  // 顯示成功訊息3秒後自動隱藏
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  // 檢查是否有重定向URL，如果有則執行跳轉
  useEffect(() => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

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
      email: '',
      password: '',
      auth: ''
    };

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
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include' // 確保包含 cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '登入失敗');
      }

      if (data.success) {
        // 根據用戶角色導向不同頁面
        if (data.role === 'admin') {
          // 管理員導向管理後台
          setTimeout(() => {
            setRedirectUrl(data.redirectTo || '/admin');
          }, 500);
        } else if (data.role === 'user') {
          // 普通用戶導向NEOFashion主頁(根路徑)
          setTimeout(() => {
            setRedirectUrl('/');
          }, 500);
        } else {
          // VIP用戶或其他角色的處理
          setTimeout(() => {
            setRedirectUrl('/');
          }, 500);
        }
      } else {
        setErrors(prev => ({
          ...prev,
          auth: data.message || '電子郵件或密碼錯誤'
        }));
      }
    } catch (error) {
      console.error('登入失敗', error);
      setErrors(prev => ({
        ...prev,
        auth: error instanceof Error ? error.message : '登入時發生錯誤，請稍後再試'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="h-16 w-16 relative">
              {/* 在實際應用中，替換為您的品牌標誌 */}
              <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-indigo-600">
                NEO
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">登入您的帳戶</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            還沒有帳戶？{' '}
            <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              立即註冊
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {showSuccessMessage && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">註冊成功！請使用您的新帳戶登入。</h3>
                </div>
              </div>
            </div>
          )}

          {errors.auth && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{errors.auth}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">電子郵件</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                } text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="電子郵件"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">密碼</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? 'border-red-300 placeholder-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500'
                } text-gray-900 rounded-b-md focus:outline-none focus:z-10 sm:text-sm`}
                placeholder="密碼"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                記住我
              </label>
            </div>

            <div className="text-sm">
              <Link href="/auth/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                忘記密碼？
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
              {isLoading ? '登入中...' : '登入'}
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