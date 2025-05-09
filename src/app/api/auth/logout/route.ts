import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // 創建回應並清除 auth_token cookie
    const response = NextResponse.json({
      success: true,
      message: '已成功登出'
    });

    // 將 cookie 的過期時間設置為過去的日期，以清除它
    response.cookies.set({
      name: 'auth_token',
      value: '',
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // 立即過期
      sameSite: 'lax'
    });

    return response;
  } catch (error) {
    console.error('登出錯誤:', error);
    return NextResponse.json(
      { success: false, message: '登出時發生錯誤' },
      { status: 500 }
    );
  }
} 