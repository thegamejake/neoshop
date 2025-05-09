import mysql from 'mysql2/promise';

// 創建資料庫連接池
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'neoshop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 測試資料庫連接
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('資料庫連接成功');
    connection.release();
    return true;
  } catch (error) {
    console.error('資料庫連接失敗:', error);
    return false;
  }
}

// 執行查詢的通用函數
export async function query<T>(sql: string, params?: any[]): Promise<T> {
    try {
        const [results] = await pool.execute(sql, params);
        return results as T;
    } catch (error) {
        console.error('查詢執行失敗：', error);
        throw error;
    }
}

// 封裝查詢函數
const db = {
  query: async (sql: string, values?: any[]) => {
    try {
      const [rows] = await pool.execute(sql, values);
      return rows;
    } catch (error) {
      console.error('資料庫查詢錯誤:', error);
      throw error;
    }
  },
  
  // 帶類型的查詢函數
  typedQuery: async <T>(sql: string, values?: any[]): Promise<T[]> => {
    try {
      const [rows] = await pool.execute(sql, values);
      return rows as T[];
    } catch (error) {
      console.error('資料庫查詢錯誤:', error);
      throw error;
    }
  }
};

export default db; 