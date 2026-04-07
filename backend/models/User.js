const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'assetdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

class User {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM users');
    return rows;
  }

  static async create(data) {
    const { name, email } = data;
    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return { id: result.insertId, ...data };
  }
}

module.exports = User;