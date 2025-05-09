import { NextResponse } from 'next/server';
import { deleteProduct, productExists, getProductById, updateProduct } from '@/lib/db/products';

// 獲取指定的產品
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: true, message: '無效的產品ID' },
        { status: 400 }
      );
    }
    
    const product = await getProductById(productId);
    
    if (!product) {
      return NextResponse.json(
        { error: true, message: '產品不存在' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('獲取產品詳情錯誤:', error);
    return NextResponse.json(
      { error: true, message: error.message || '獲取產品詳情時發生錯誤' },
      { status: 500 }
    );
  }
}

// 更新指定的產品
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: true, message: '無效的產品ID' },
        { status: 400 }
      );
    }
    
    // 檢查產品是否存在
    const exists = await productExists(productId);
    if (!exists) {
      return NextResponse.json(
        { error: true, message: '產品不存在' },
        { status: 404 }
      );
    }
    
    // 獲取請求數據
    const formData = await request.formData();
    
    // 從表單提取產品數據
    const productData: {
      name: string;
      description: string;
      category_id: number;
      price: number;
      discountPrice: number | null;
      stockQuantity: number;
      sku: string;
      weight: number | null;
      dimensions: string;
      featured: boolean;
      sizes?: number[];
    } = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      category_id: parseInt(formData.get('category') as string),
      price: parseFloat(formData.get('price') as string),
      discountPrice: parseFloat(formData.get('discountPrice') as string) || null,
      stockQuantity: parseInt(formData.get('stockQuantity') as string),
      sku: formData.get('sku') as string,
      weight: parseFloat(formData.get('weight') as string) || null,
      dimensions: formData.get('dimensions') as string,
      featured: formData.get('featured') === 'true'
    };
    
    // 驗證必要欄位
    if (!productData.name || productData.name.trim() === '') {
      return NextResponse.json(
        { error: true, message: '產品名稱不能為空' },
        { status: 400 }
      );
    }
    
    if (isNaN(productData.price) || productData.price <= 0) {
      return NextResponse.json(
        { error: true, message: '產品價格必須大於0' },
        { status: 400 }
      );
    }
    
    // 處理尺碼數據
    let sizesData: number[] = [];
    const sizesString = formData.get('sizes');
    if (sizesString) {
      try {
        sizesData = JSON.parse(sizesString as string);
      } catch (e) {
        console.error('解析尺碼數據錯誤:', e);
      }
    }
    
    // 將尺碼數據添加到產品數據中
    productData.sizes = sizesData;
    
    // 更新產品
    await updateProduct(productId, productData);
    
    return NextResponse.json({
      success: true,
      message: '產品更新成功'
    });
  } catch (error: any) {
    console.error('更新產品錯誤:', error);
    return NextResponse.json(
      { error: true, message: error.message || '更新產品時發生錯誤' },
      { status: 500 }
    );
  }
}

// 刪除指定的產品
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: true, message: '無效的產品ID' },
        { status: 400 }
      );
    }
    
    // 檢查產品是否存在
    const exists = await productExists(productId);
    if (!exists) {
      return NextResponse.json(
        { error: true, message: '產品不存在' },
        { status: 404 }
      );
    }
    
    // 執行刪除
    await deleteProduct(productId);
    
    return NextResponse.json({
      success: true,
      message: '產品刪除成功'
    });
  } catch (error: any) {
    console.error('刪除產品錯誤:', error);
    return NextResponse.json(
      { error: true, message: error.message || '刪除產品時發生錯誤' },
      { status: 500 }
    );
  }
} 