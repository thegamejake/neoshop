import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // 顯示資料庫配置信息（不包含密碼）
    console.log('資料庫連接配置:', {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      database: process.env.DB_NAME || 'neo_fashion',
    });

    // 測試1: 獲取當前資料庫名稱
    const dbInfo = await db.query('SELECT DATABASE() as db_name') as any[];
    
    // 測試2: 列出所有用戶表
    const users = await db.query('SELECT id, name, email, role, status FROM users') as any[];
    
    // 測試3: 獲取表結構
    const tableInfo = await db.query('DESCRIBE users') as any[];

    return NextResponse.json({
      success: true,
      database: dbInfo[0]?.db_name || 'unknown',
      userCount: users.length,
      users: users.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status
      })),
      tableStructure: tableInfo
    });
  } catch (error) {
    console.error('測試資料庫連接時出錯:', error);
    return NextResponse.json(
      { success: false, message: '資料庫測試失敗', error: String(error) },
      { status: 500 }
    );
  }
} 