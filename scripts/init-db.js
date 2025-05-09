const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function main() {
  try {
    // 創建資料庫連接
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '92489278', // 請換成您的實際 MySQL 密碼
    });

    console.log('連接到 MySQL 資料庫成功');

    // 確保資料庫存在
    await connection.query(`CREATE DATABASE IF NOT EXISTS neoshop`);
    console.log('資料庫 neoshop 已確保存在');

    // 使用資料庫
    await connection.query(`USE neoshop`);

    // 檢查用戶表是否存在，如果不存在則創建
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role ENUM('user', 'vip_user', 'admin') DEFAULT 'user',
        status ENUM('active', 'inactive') DEFAULT 'active',
        last_login DATETIME,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('用戶表已確保存在');

    // 檢查是否已有管理員用戶
    const [adminUsers] = await connection.query(
      `SELECT * FROM users WHERE role = 'admin' LIMIT 1`
    );

    if (adminUsers.length === 0) {
      // 創建一個管理員用戶
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await connection.query(
        `INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)`,
        ['管理員', 'admin@neoshop.com', hashedPassword, 'admin', 'active']
      );
      console.log('已創建管理員用戶：');
      console.log('- 電子郵件: admin@neoshop.com');
      console.log('- 密碼: admin123');
    } else {
      console.log('管理員用戶已存在，無需創建新的管理員');
    }

    // 關閉連接
    await connection.end();
    console.log('資料庫初始化完成');
  } catch (error) {
    console.error('初始化資料庫時出錯:', error);
    process.exit(1);
  }
}

main(); 