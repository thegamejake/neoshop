import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 驗證輸入
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: '請填寫所有必要欄位' },
        { status: 400 }
      );
    }

    // 檢查電子郵件是否已存在
    interface UserEmail extends RowDataPacket {
      email: string;
    }
    
    const existingUsers = await db.typedQuery<UserEmail>(
      'SELECT email FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: '此電子郵件已被註冊' },
        { status: 409 }
      );
    }

    // 哈希密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建新用戶
    await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );

    return NextResponse.json(
      { message: '註冊成功' },
      { status: 201 }
    );
  } catch (error) {
    console.error('註冊錯誤:', error);
    return NextResponse.json(
      { error: '註冊過程中發生錯誤' },
      { status: 500 }
    );
  }
} 