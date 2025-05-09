import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    // 確保請求是 FormData 格式
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: '請求格式必須為 multipart/form-data' },
        { status: 400 }
      );
    }
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    
    if (!file) {
      return NextResponse.json(
        { error: '沒有提供檔案' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // 確保上傳目錄存在
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    if (!fs.existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // 寫入檔案
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    
    // 返回可以用於前端顯示的路徑
    const publicPath = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      message: '檔案上傳成功',
      filePath: publicPath
    });
    
  } catch (error) {
    console.error('上傳檔案錯誤:', error);
    return NextResponse.json(
      { error: '上傳檔案時發生錯誤' },
      { status: 500 }
    );
  }
} 