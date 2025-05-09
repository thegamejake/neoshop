const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function resetPassword() {
  try {
    // 創建資料庫連接
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '92489278', // 請換成您的實際 MySQL 密碼
      database: 'neoshop'
    });

    console.log('連接到 MySQL 資料庫成功');

    // 新密碼
    const newPassword = 'admin';
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // 更新密碼
    const [result] = await connection.query(
      `UPDATE users SET password = ? WHERE email = ?`,
      [hashedPassword, 'usengjake@gmail.com']
    );

    if (result.affectedRows > 0) {
      console.log('密碼重設成功！');
      console.log('用戶資訊:');
      console.log('- 電子郵件: usengjake@gmail.com');
      console.log('- 新密碼: ' + newPassword);
      
      // 驗證新密碼
      const [users] = await connection.query(
        `SELECT password FROM users WHERE email = ?`,
        ['usengjake@gmail.com']
      );
      
      if (users.length > 0) {
        const isValid = await bcrypt.compare(newPassword, users[0].password);
        console.log('- 新密碼驗證:', isValid ? '成功' : '失敗');
      }
    } else {
      console.log('找不到用戶或密碼未更改');
    }

    // 關閉連接
    await connection.end();
  } catch (error) {
    console.error('重設密碼時出錯:', error);
    process.exit(1);
  }
}

resetPassword(); 