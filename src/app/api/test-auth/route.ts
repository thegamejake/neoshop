import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function GET(request: NextRequest) {
  try {
    // 獲取所有 cookies
    const cookies = request.cookies;
    const allCookies = Object.fromEntries(
      cookies.getAll().map(cookie => [cookie.name, cookie.value])
    );

    // 特別檢查 auth_token
    const authToken = cookies.get('auth_token')?.value;
    
    // 解析令牌（如果存在）
    let tokenData = null;
    if (authToken) {
      try {
        const jwtSecret = process.env.JWT_SECRET || 'neoshop_jwt_secret_key_2024';
        const secretKey = new TextEncoder().encode(jwtSecret);
        
        const { payload } = await jose.jwtVerify(
          authToken,
          secretKey,
          { algorithms: ['HS256'] }
        );
        
        tokenData = payload;
      } catch (e) {
        tokenData = { error: 'Invalid token', message: (e as Error).message };
      }
    }

    // 獲取所有請求頭
    const headers = Object.fromEntries(
      [...request.headers.entries()].map(([key, value]) => [key, value])
    );

    return NextResponse.json({
      success: true,
      message: '認證檢查',
      cookies: {
        all: allCookies,
        authToken: authToken || null
      },
      tokenData,
      headers
    });
  } catch (error) {
    console.error('測試認證時出錯:', error);
    return NextResponse.json(
      { success: false, message: '認證測試失敗', error: String(error) },
      { status: 500 }
    );
  }
} 