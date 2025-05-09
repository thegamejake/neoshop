import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import db from '@/lib/db';
import * as jose from 'jose';
import { RowDataPacket } from 'mysql2';
import { User } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // 驗證必要欄位
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: '請提供電子郵件和密碼' },
        { status: 400 }
      );
    }

    // 從資料庫獲取用戶
    interface UserWithPassword extends User {
      password: string;
    }
    
    const users = await db.typedQuery<UserWithPassword & RowDataPacket>(
      'SELECT id, name, email, password, role, status FROM users WHERE email = ?',
      [email]
    );

    // 檢查用戶是否存在
    if (!users || users.length === 0) {
      return NextResponse.json(
        { success: false, message: '電子郵件或密碼錯誤' },
        { status: 401 }
      );
    }

    const userData = users[0];

    // 檢查帳戶狀態
    if (userData.status !== 'active') {
      return NextResponse.json(
        { success: false, message: '此帳戶已被停用' },
        { status: 403 }
      );
    }

    // 驗證密碼
    try {
      const isPasswordValid = await compare(password, userData.password);
      
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, message: '電子郵件或密碼錯誤' },
          { status: 401 }
        );
      }
    } catch (pwError) {
      console.error('密碼比對過程錯誤:', pwError);
      return NextResponse.json(
        { success: false, message: '登入時發生錯誤，請稍後再試' },
        { status: 500 }
      );
    }

    // 檢查用戶角色是否為admin
    const isAdmin = userData.role === 'admin';
    
    // 根據用戶角色設置重定向路徑
    let redirectPath = '/';
    if (isAdmin) {
      redirectPath = '/admin';
    }
    
    // 生成JWT令牌
    const tokenData = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      name: userData.name
    };
    
    // 使用 jose 生成 JWT 令牌
    const jwtSecret = process.env.JWT_SECRET || 'neoshop_jwt_secret_key_2024';
    const secretKey = new TextEncoder().encode(jwtSecret);
    
    const token = await new jose.SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secretKey);

    // 更新最後登入時間
    await db.query('UPDATE users SET last_login = NOW() WHERE id = ?', [userData.id]);

    // 建立回應物件並設置 cookie
    const response = NextResponse.json({
      success: true,
      role: userData.role,
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      },
      redirectTo: redirectPath
    });

    // 設置 cookie - 使用更寬鬆的設置
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: false, // 本地開發環境使用 false
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: 'lax'  // 改為 lax 以增加兼容性
    });

    return response;
  } catch (error) {
    console.error('登入錯誤:', error);
    return NextResponse.json(
      { success: false, message: '登入時發生錯誤，請稍後再試' },
      { status: 500 }
    );
  }
} 