import { NextResponse } from 'next/server';
import { getAllSizes } from '@/lib/db/products';

// 獲取所有尺寸
export async function GET(request: Request) {
  try {
    const sizes = await getAllSizes();
    return NextResponse.json(sizes);
  } catch (error: any) {
    console.error('獲取尺寸列表錯誤:', error);
    return NextResponse.json(
      { error: true, message: error.message || '獲取尺寸列表時發生錯誤' },
      { status: 500 }
    );
  }
} 