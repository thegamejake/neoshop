require('dotenv').config();
const mysql = require('mysql2/promise');

// 創建數據庫連接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '92489278',
  database: process.env.DB_NAME || 'neoshop',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool; 