import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
import db from '@/lib/db';
import { User } from '@/types';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  try {
    // 從cookie中獲取令牌
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: '未授權' }, { status: 401 });
    }

    // 驗證令牌
    const jwtSecret = process.env.JWT_SECRET || 'neoshop_jwt_secret_key_2024';
    const secretKey = new TextEncoder().encode(jwtSecret);
    
    try {
      const { payload } = await jose.jwtVerify(token, secretKey);
      
      const userId = payload.id as number;
      
      // 從資料庫獲取用戶信息
      const users = await db.typedQuery<User & RowDataPacket>(
        'SELECT id, name, email, role, status FROM users WHERE id = ?',
        [userId]
      );
      
      if (!users || users.length === 0) {
        return NextResponse.json({ error: '用戶不存在' }, { status: 404 });
      }
      
      const user = users[0];
      
      // 不返回敏感信息
      const { password, ...safeUser } = user as any;
      
      return NextResponse.json({
        user: safeUser
      });
    } catch (jwtError) {
      console.error('JWT驗證錯誤:', jwtError);
      return NextResponse.json({ error: '無效的認證令牌' }, { status: 401 });
    }
  } catch (error) {
    console.error('獲取用戶信息錯誤:', error);
    return NextResponse.json(
      { error: '獲取用戶信息時發生錯誤' },
      { status: 500 }
    );
  }
} 