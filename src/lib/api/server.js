require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getAllProducts, initDatabase } = require('../db/products');

const app = express();
const port = process.env.PORT || 3001;

// 中間件
app.use(cors());
app.use(express.json());

// 全局錯誤處理中間件
app.use((err, req, res, next) => {
  console.error('全局錯誤:', err);
  res.status(500).json({ 
    error: '服務器內部錯誤', 
    message: err.message || '處理請求時發生錯誤'
  });
});

// 初始化數據庫
let dbInitialized = false;
let dbInitError = null;

(async () => {
  try {
    await initDatabase();
    dbInitialized = true;
    console.log('數據庫初始化成功');
  } catch (error) {
    dbInitError = error;
    console.error('數據庫初始化失敗:', error);
  }
})();

// API 路由
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    dbInitialized,
    dbError: dbInitError ? {
      message: dbInitError.message,
      code: dbInitError.code || 'UNKNOWN_ERROR'
    } : null
  });
});

app.get('/api/products', async (req, res) => {
  try {
    // 如果數據庫初始化失敗，返回錯誤
    if (!dbInitialized) {
      return res.status(503).json({ 
        error: '數據庫尚未準備就緒',
        message: dbInitError ? dbInitError.message : '正在初始化數據庫，請稍後重試'
      });
    }
    
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('獲取產品錯誤:', error);
    res.status(500).json({ 
      error: '獲取產品時發生錯誤',
      message: error.message || '處理請求時發生錯誤'
    });
  }
});

// 啟動服務器
app.listen(port, () => {
  console.log(`API 服務器運行在端口 ${port}`);
});

module.exports = app; 