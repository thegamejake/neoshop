const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function checkPassword() {
  try {
    // 創建資料庫連接
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '92489278', // 使用您的實際 MySQL 密碼
      database: 'neoshop'
    });

    console.log('連接到 MySQL 資料庫成功');

    // 檢查用戶密碼
    const [users] = await connection.query(
      `SELECT id, name, email, password, role, status FROM users WHERE email = ?`,
      ['usengjake@gmail.com']
    );

    if (users.length === 0) {
      console.log('找不到用戶');
      return;
    }

    const user = users[0];
    console.log('用戶資訊:');
    console.log('- ID:', user.id);
    console.log('- 名稱:', user.name);
    console.log('- Email:', user.email);
    console.log('- 角色:', user.role);
    console.log('- 狀態:', user.status);
    console.log('- 密碼雜湊值:', user.password);
    console.log('- 密碼雜湊長度:', user.password.length);
    console.log('- 密碼雜湊前綴:', user.password.substring(0, 10) + '...');

    // 測試密碼比對
    console.log('\n測試密碼比對:');
    
    // 測試 'admin' 密碼
    const testPassword1 = 'admin';
    try {
      const isPasswordValid1 = await bcrypt.compare(testPassword1, user.password);
      console.log(`- 密碼 '${testPassword1}' 是否匹配:`, isPasswordValid1);
    } catch(err) {
      console.log(`- 比對密碼 '${testPassword1}' 時出錯:`, err.message);
    }
    
    // 測試另一個可能的密碼
    const testPassword2 = 'password123';
    try {
      const isPasswordValid2 = await bcrypt.compare(testPassword2, user.password);
      console.log(`- 密碼 '${testPassword2}' 是否匹配:`, isPasswordValid2);
    } catch(err) {
      console.log(`- 比對密碼 '${testPassword2}' 時出錯:`, err.message);
    }

    // 建立新的測試密碼雜湊
    console.log('\n產生新的密碼雜湊:');
    const newHash = await bcrypt.hash('admin', 10);
    console.log('- 新密碼雜湊值:', newHash);
    console.log('- 新密碼雜湊長度:', newHash.length);
    console.log('- 雜湊前綴:', newHash.substring(0, 10) + '...');

    // 關閉連接
    await connection.end();
  } catch (error) {
    console.error('檢查密碼時出錯:', error);
    process.exit(1);
  }
}

checkPassword(); 