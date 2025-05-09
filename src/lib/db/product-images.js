const pool = require('./config');

// 上傳產品圖片信息到數據庫
async function uploadProductImage(imageData) {
  try {
    const { product_id, image_url, is_primary, display_order } = imageData;
    
    // 如果這是主圖，先將其他圖片設為非主圖
    if (is_primary) {
      await pool.query(
        `UPDATE product_images 
         SET is_primary = 0 
         WHERE product_id = ?`,
        [product_id]
      );
    }
    
    // 插入新圖片
    const [result] = await pool.query(
      `INSERT INTO product_images (
        product_id, 
        image_url, 
        is_primary, 
        display_order
      ) VALUES (?, ?, ?, ?)`,
      [
        product_id,
        image_url,
        is_primary ? 1 : 0,
        display_order || 0
      ]
    );
    
    return result.insertId;
  } catch (error) {
    console.error('上傳產品圖片錯誤:', error);
    throw error;
  }
}

// 獲取產品圖片
async function getProductImages(productId) {
  try {
    const [rows] = await pool.query(
      `SELECT * 
       FROM product_images 
       WHERE product_id = ? 
       ORDER BY is_primary DESC, display_order ASC`,
      [productId]
    );
    
    return rows;
  } catch (error) {
    console.error('獲取產品圖片錯誤:', error);
    throw error;
  }
}

// 刪除產品圖片
async function deleteProductImage(imageId) {
  try {
    await pool.query(
      'DELETE FROM product_images WHERE id = ?',
      [imageId]
    );
    
    return true;
  } catch (error) {
    console.error('刪除產品圖片錯誤:', error);
    throw error;
  }
}

module.exports = {
  uploadProductImage,
  getProductImages,
  deleteProductImage
}; 