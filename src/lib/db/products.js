const pool = require('./config');

// 獲取所有產品
async function getAllProducts() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id, 
        p.name, 
        c.name AS category, 
        p.price, 
        p.stock, 
        p.status
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
    `);
    
    // 狀態映射表，將資料庫 ENUM 映射到中文顯示
    const statusDisplayMap = {
      'on_sale': '在售',
      'low_stock': '低庫存',
      'out_of_stock': '缺貨',
      'discontinued': '停售'
    };
    
    // 獲取每個產品的尺寸
    for (let product of rows) {
      const [sizes] = await pool.query(`
        SELECT s.name 
        FROM sizes s
        JOIN product_variants pv ON s.id = pv.size_id
        WHERE pv.product_id = ?
        GROUP BY s.id
        ORDER BY s.display_order
      `, [product.id]);
      
      product.sizes = sizes.map(size => size.name);
      
      // 將價格格式化為 NT$ 形式
      product.price = `NT$ ${parseInt(product.price).toLocaleString()}`;
      
      // 將狀態從英文轉換為中文顯示
      product.status = statusDisplayMap[product.status] || product.status;
    }
    
    return rows;
  } catch (error) {
    console.error('獲取產品列表錯誤:', error);
    throw error;
  }
}

// 初始化數據庫表和示例數據
async function initDatabase() {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // 創建分類表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        parent_id INT,
        description TEXT,
        image_url VARCHAR(255),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
    
    // 創建產品表 - 修改 ENUM 定義，使其與插入數據一致
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category_id INT,
        price DECIMAL(10, 2) NOT NULL,
        original_price DECIMAL(10, 2),
        cost DECIMAL(10, 2),
        sku VARCHAR(50) UNIQUE,
        status ENUM('on_sale', 'low_stock', 'out_of_stock', 'discontinued') DEFAULT 'on_sale',
        stock INT DEFAULT 0,
        weight DECIMAL(8, 2),
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
    
    // 創建尺寸表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sizes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        display_order INT DEFAULT 0
      )
    `);
    
    // 創建顏色表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS colors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        color_code VARCHAR(20) NOT NULL
      )
    `);
    
    // 創建產品變體表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS product_variants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        product_id INT NOT NULL,
        size_id INT,
        color_id INT,
        sku VARCHAR(50) UNIQUE,
        price DECIMAL(10, 2),
        stock INT DEFAULT 0,
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY (size_id) REFERENCES sizes(id) ON DELETE SET NULL,
        FOREIGN KEY (color_id) REFERENCES colors(id) ON DELETE SET NULL
      )
    `);
    
    // 檢查是否已存在數據，避免重複插入
    const [categoriesCount] = await connection.query('SELECT COUNT(*) as count FROM categories');
    if (categoriesCount[0].count === 0) {
      // 插入分類數據
      await connection.query(`
        INSERT INTO categories (name, description) VALUES
        ('男裝', '男性服裝分類'),
        ('女裝', '女性服裝分類'),
        ('配飾', '配件與飾品分類')
      `);
    }
    
    // 檢查尺寸表是否有數據
    const [sizesCount] = await connection.query('SELECT COUNT(*) as count FROM sizes');
    if (sizesCount[0].count === 0) {
      // 插入尺寸數據
      await connection.query(`
        INSERT INTO sizes (name, display_order) VALUES
        ('XS', 1),
        ('S', 2),
        ('M', 3),
        ('L', 4),
        ('XL', 5),
        ('XXL', 6)
      `);
    }
    
    // 檢查顏色表是否有數據
    const [colorsCount] = await connection.query('SELECT COUNT(*) as count FROM colors');
    if (colorsCount[0].count === 0) {
      // 插入顏色數據
      await connection.query(`
        INSERT INTO colors (name, color_code) VALUES
        ('白色', '#FFFFFF'),
        ('黑色', '#000000'),
        ('藍色', '#0000FF'),
        ('紅色', '#FF0000'),
        ('灰色', '#808080')
      `);
    }
    
    // 檢查產品表是否有數據
    const [productsCount] = await connection.query('SELECT COUNT(*) as count FROM products');
    if (productsCount[0].count === 0) {
      // 獲取分類ID
      const [categories] = await connection.query('SELECT id, name FROM categories');
      const categoryMap = {};
      categories.forEach(cat => {
        categoryMap[cat.name] = cat.id;
      });
      
      // 狀態映射表，將中文狀態映射到資料庫 ENUM
      const statusMap = {
        '在售': 'on_sale',
        '低庫存': 'low_stock',
        '缺貨': 'out_of_stock',
        '停售': 'discontinued'
      };
      
      // 獲取尺寸ID
      const [sizes] = await connection.query('SELECT id, name FROM sizes');
      const sizeMap = {};
      sizes.forEach(size => {
        sizeMap[size.name] = size.id;
      });
      
      // 循環插入產品數據
      for (const product of products) {
        // 插入基本產品信息，使用狀態映射
        const [result] = await connection.query(
          `INSERT INTO products (name, description, category_id, price, stock, status) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            product.name, 
            product.description,
            categoryMap[product.category], 
            product.price, 
            product.stock, 
            statusMap[product.status] // 使用映射後的英文狀態值
          ]
        );
        
        const productId = result.insertId;
        
        // 根據產品設置尺寸變體
        let productSizes = [];
        if (product.category === '男裝') {
          productSizes = ['M', 'L', 'XL'];
          if (product.name.includes('襯衫')) {
            productSizes.unshift('S');
          }
          if (product.name.includes('西裝')) {
            productSizes.push('XXL');
          }
        } else if (product.category === '女裝') {
          productSizes = ['S', 'M', 'L'];
          if (product.name.includes('外套') || product.name.includes('連衣裙')) {
            productSizes.unshift('XS');
          }
        } else if (product.category === '配飾' && product.name.includes('鞋')) {
          productSizes = ['M', 'L', 'XL'];
        }
        
        // 插入尺寸變體
        for (const size of productSizes) {
          if (sizeMap[size]) {
            // 每個尺寸分配一部分庫存
            const variantStock = Math.max(1, Math.floor(product.stock / productSizes.length));
            await connection.query(
              `INSERT INTO product_variants (product_id, size_id, stock) 
               VALUES (?, ?, ?)`,
              [productId, sizeMap[size], variantStock]
            );
          }
        }
      }
    }
    
    await connection.commit();
    console.log('數據庫初始化成功');
  } catch (error) {
    await connection.rollback();
    console.error('數據庫初始化錯誤:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// 插入新產品
async function insertProduct(productData) {
  try {
    const {
      name,
      description,
      category_id,
      price,
      original_price,
      stock,
      sku,
      status,
      weight,
      dimensions,
      featured
    } = productData;
    
    const [result] = await pool.query(
      `INSERT INTO products (
        name, 
        description, 
        category_id, 
        price, 
        original_price, 
        stock, 
        sku, 
        status, 
        weight, 
        featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        description || null,
        category_id,
        price,
        original_price || null,
        stock || 0,
        sku || null,
        status || 'on_sale',
        weight || null,
        featured ? 1 : 0
      ]
    );
    
    return result.insertId;
  } catch (error) {
    console.error('插入產品錯誤:', error);
    throw error;
  }
}

// 獲取最後插入的ID
async function getLastInsertId() {
  try {
    const [result] = await pool.query('SELECT LAST_INSERT_ID() as id');
    return result[0].id;
  } catch (error) {
    console.error('獲取最後插入ID錯誤:', error);
    throw error;
  }
}

// 新增產品變體
async function insertProductVariant(variantData) {
  try {
    const { product_id, size_id, color_id, sku, price, stock } = variantData;
    
    const [result] = await pool.query(
      `INSERT INTO product_variants (
        product_id, size_id, color_id, sku, price, stock
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        product_id,
        size_id || null,
        color_id || null,
        sku || null,
        price || null,
        stock || 0
      ]
    );
    
    return result.insertId;
  } catch (error) {
    console.error('插入產品變體錯誤:', error);
    throw error;
  }
}

// 刪除產品
async function deleteProduct(productId) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // 刪除產品相關的所有圖片
    await connection.query(
      'DELETE FROM product_images WHERE product_id = ?',
      [productId]
    );
    
    // 刪除產品相關的所有變體
    await connection.query(
      'DELETE FROM product_variants WHERE product_id = ?',
      [productId]
    );
    
    // 刪除產品特性（如果有）
    await connection.query(
      'DELETE FROM product_features WHERE product_id = ?',
      [productId]
    );
    
    // 最後刪除產品本身
    await connection.query(
      'DELETE FROM products WHERE id = ?',
      [productId]
    );
    
    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    console.error('刪除產品錯誤:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// 檢查產品是否存在
async function productExists(productId) {
  try {
    const [rows] = await pool.query(
      'SELECT id FROM products WHERE id = ?',
      [productId]
    );
    return rows.length > 0;
  } catch (error) {
    console.error('檢查產品存在錯誤:', error);
    throw error;
  }
}

// 獲取單個產品詳細信息
async function getProductById(productId) {
  const connection = await pool.getConnection();
  
  try {
    // 獲取產品基本信息
    const [productRows] = await connection.query(`
      SELECT 
        p.id, 
        p.name, 
        p.description,
        p.category_id,
        p.price,
        p.original_price as discountPrice,
        p.stock as stockQuantity,
        p.sku,
        p.weight,
        p.featured,
        c.name as categoryName
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [productId]);
    
    if (productRows.length === 0) {
      return null;
    }
    
    const product = productRows[0];
    
    // 獲取產品尺寸
    const [sizeRows] = await connection.query(`
      SELECT 
        s.id, 
        s.name as size
      FROM sizes s
      JOIN product_variants pv ON s.id = pv.size_id
      WHERE pv.product_id = ?
      GROUP BY s.id
      ORDER BY s.display_order
    `, [productId]);
    
    product.sizes = sizeRows;
    
    // 獲取產品圖片
    const [imageRows] = await connection.query(`
      SELECT 
        id,
        image_url as url,
        is_primary as isPrimary,
        display_order as sortOrder
      FROM product_images
      WHERE product_id = ?
      ORDER BY is_primary DESC, display_order ASC
    `, [productId]);
    
    product.images = imageRows;
    
    // 為空的可選欄位設置預設值
    product.dimensions = product.dimensions || '';
    
    return product;
  } catch (error) {
    console.error('獲取產品詳細信息錯誤:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// 更新產品信息
async function updateProduct(productId, productData) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    const {
      name,
      description,
      category_id,
      price,
      discountPrice,
      stockQuantity,
      sku,
      weight,
      dimensions,
      featured,
      sizes
    } = productData;
    
    // 更新產品基本信息
    await connection.query(`
      UPDATE products 
      SET 
        name = ?, 
        description = ?, 
        category_id = ?,
        price = ?,
        original_price = ?,
        stock = ?,
        sku = ?,
        weight = ?,
        featured = ?
      WHERE id = ?
    `, [
      name,
      description || null,
      category_id,
      price,
      discountPrice || null,
      stockQuantity || 0,
      sku || null,
      weight || null,
      featured ? 1 : 0,
      productId
    ]);
    
    // 如果提供了尺寸數據，則更新尺寸
    if (sizes && Array.isArray(sizes)) {
      // 移除所有舊尺寸變體
      await connection.query(
        'DELETE FROM product_variants WHERE product_id = ?',
        [productId]
      );
      
      // 新增變體
      for (const sizeId of sizes) {
        // 為每個尺碼創建產品變體
        await connection.query(
          `INSERT INTO product_variants (product_id, size_id, stock) 
           VALUES (?, ?, ?)`,
          [
            productId,
            sizeId,
            Math.ceil(stockQuantity / sizes.length) // 平均分配庫存
          ]
        );
      }
    }
    
    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    console.error('更新產品錯誤:', error);
    throw error;
  } finally {
    connection.release();
  }
}

// 獲取所有分類
async function getAllCategories() {
  try {
    const [rows] = await pool.query(`
      SELECT id, name 
      FROM categories 
      WHERE status = 'active'
      ORDER BY name
    `);
    return rows;
  } catch (error) {
    console.error('獲取分類列表錯誤:', error);
    throw error;
  }
}

// 獲取所有尺寸
async function getAllSizes() {
  try {
    const [rows] = await pool.query(`
      SELECT id, name as size
      FROM sizes
      ORDER BY display_order
    `);
    return rows;
  } catch (error) {
    console.error('獲取尺寸列表錯誤:', error);
    throw error;
  }
}

module.exports = {
  getAllProducts,
  initDatabase,
  insertProduct,
  getLastInsertId,
  insertProductVariant,
  deleteProduct,
  productExists,
  getProductById,
  updateProduct,
  getAllCategories,
  getAllSizes
}; 