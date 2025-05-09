import { NextResponse } from 'next/server';
import { insertProduct, getLastInsertId, insertProductVariant, getAllProducts } from '@/lib/db/products';
import { uploadProductImage } from '@/lib/db/product-images';

// 獲取產品列表
export async function GET(request: Request) {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('獲取產品列表錯誤:', error);
    return NextResponse.json(
      { error: true, message: error.message || '獲取產品列表時發生錯誤' },
      { status: 500 }
    );
  }
}

// 新增產品
export async function POST(request: Request) {
  try {
    // 使用 JSON 格式而不是 FormData
    const productData = await request.json();
    
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
    const sizesData = productData.sizes || [];
    
    // 插入產品基本信息
    const productDataForDb = {
      name: productData.name,
      description: productData.description,
      category_id: productData.category_id,
      price: productData.price,
      original_price: productData.original_price || null,
      stock: productData.stock,
      sku: productData.sku,
      status: productData.status,
      weight: productData.weight || null,
      dimensions: productData.dimensions,
      featured: productData.featured,
    };
    
    await insertProduct(productDataForDb);
    const productId = await getLastInsertId();
    
    // 處理尺碼
    if (sizesData.length > 0) {
      for (const sizeId of sizesData) {
        // 為每個尺碼創建產品變體
        await insertProductVariant({
          product_id: productId,
          size_id: sizeId,
          stock: Math.ceil(productDataForDb.stock / sizesData.length) // 平均分配庫存
        });
      }
    }
    
    // 處理圖片路徑
    const imagePaths = productData.image_paths || [];
    if (imagePaths.length > 0) {
      for (let i = 0; i < imagePaths.length; i++) {
        const imageUrl = imagePaths[i];
        const isPrimary = i === 0; // 第一張圖片設為主圖
        
        // 將圖片信息保存到數據庫
        await uploadProductImage({
          product_id: productId,
          image_url: imageUrl,
          is_primary: isPrimary ? 1 : 0,
          display_order: i
        });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: '產品創建成功', 
      productId 
    });
  } catch (error: any) {
    console.error('創建產品錯誤:', error);
    return NextResponse.json(
      { error: true, message: error.message || '創建產品時發生錯誤' },
      { status: 500 }
    );
  }
}

// 處理圖片上傳的輔助函數
async function handleImageUpload(file: File, productId: number, isPrimary: boolean, displayOrder: number) {
  // 實際項目中，這裡應該處理文件上傳到雲存儲服務器（如 AWS S3, Cloudinary 等）
  // 為了演示，我們假設圖片已保存，僅記錄到數據庫
  
  // 生成圖片URL（實際項目應由雲存儲服務提供）
  const fileName = `product_${productId}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const imageUrl = `/uploads/products/${fileName}`;
  
  // 將圖片信息保存到數據庫
  await uploadProductImage({
    product_id: productId,
    image_url: imageUrl,
    is_primary: isPrimary ? 1 : 0,
    display_order: displayOrder
  });
  
  return imageUrl;
} 