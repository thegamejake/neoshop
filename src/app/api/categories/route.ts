import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/db/products';

// 獲取所有分類
export async function GET(request: Request) {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    console.error('獲取分類列表錯誤:', error);
    return NextResponse.json(
      { error: true, message: error.message || '獲取分類列表時發生錯誤' },
      { status: 500 }
    );
  }
} 