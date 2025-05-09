const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function addUser() {
  try {
    // 創建資料庫連接
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '92489278', // 請換成您的實際 MySQL 密碼
      database: 'neoshop'
    });

    console.log('連接到 MySQL 資料庫成功');

    // 檢查用戶是否已存在
    const [existingUsers] = await connection.query(
      `SELECT * FROM users WHERE email = ?`,
      ['usengjake@gmail.com']
    );

    if (existingUsers.length > 0) {
      console.log('用戶已存在，無需重新創建');
      console.log('用戶資訊：', {
        id: existingUsers[0].id,
        name: existingUsers[0].name,
        email: existingUsers[0].email,
        role: existingUsers[0].role,
        status: existingUsers[0].status
      });
    } else {
      // 創建新用戶
      const hashedPassword = await bcrypt.hash('password123', 10);
      const [result] = await connection.query(
        `INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)`,
        ['Jake Useng', 'usengjake@gmail.com', hashedPassword, 'admin', 'active']
      );
      console.log('已創建新用戶：');
      console.log('- ID:', result.insertId);
      console.log('- 姓名: Jake Useng');
      console.log('- 電子郵件: usengjake@gmail.com');
      console.log('- 密碼: password123');
      console.log('- 角色: admin');
    }

    // 顯示所有用戶
    const [allUsers] = await connection.query(`SELECT id, name, email, role, status FROM users`);
    console.log('\n所有用戶列表:');
    allUsers.forEach(user => {
      console.log(`- ID ${user.id}: ${user.name} (${user.email}) - ${user.role} (${user.status})`);
    });

    // 關閉連接
    await connection.end();
  } catch (error) {
    console.error('添加用戶時出錯:', error);
    process.exit(1);
  }
}

addUser(); 