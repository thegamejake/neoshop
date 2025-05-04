import { NextResponse } from 'next/server';
import { testConnection } from '@/lib/db';

export async function GET() {
    try {
        const isConnected = await testConnection();
        
        if (isConnected) {
            return NextResponse.json({ 
                status: 'success', 
                message: '資料庫連接成功' 
            });
        } else {
            return NextResponse.json({ 
                status: 'error', 
                message: '資料庫連接失敗' 
            }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ 
            status: 'error', 
            message: '發生錯誤：' + (error as Error).message 
        }, { status: 500 });
    }
} 