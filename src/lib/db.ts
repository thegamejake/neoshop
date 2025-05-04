import mysql from 'mysql2/promise';

// 資料庫配置
const DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '92489278',
    database: 'neoshop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// 創建連接池
const pool = mysql.createPool(DB_CONFIG);

// 測試資料庫連接
export async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('資料庫連接成功！');
        connection.release();
        return true;
    } catch (error) {
        console.error('資料庫連接失敗：', error);
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

export default pool; 