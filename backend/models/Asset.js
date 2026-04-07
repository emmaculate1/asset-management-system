const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',          // XAMPP default: no password
  database: 'assetdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

class Asset {
  static get pool() {
    return pool;
  }

  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM assets ORDER BY id DESC');
    return rows;
  }

  static async create(data) {
    const { name, category, serialNumber, purchaseDate, status = 'Available', assignedTo = null } = data;
    const [result] = await pool.execute(
      'INSERT INTO assets (name, category, serialNumber, purchaseDate, status, assignedTo) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, serialNumber, purchaseDate, status, assignedTo]
    );
    return { id: result.insertId, ...data };
  }

  static async findByIdAndUpdate(id, data) {
    const { name, category, serialNumber, purchaseDate, status, assignedTo = null } = data;
    await pool.execute(
      'UPDATE assets SET name = ?, category = ?, serialNumber = ?, purchaseDate = ?, status = ?, assignedTo = ? WHERE id = ?',
      [name, category, serialNumber, purchaseDate, status, assignedTo, id]
    );
    return { id, ...data };
  }

  static async findByIdAndDelete(id) {
    await pool.execute('DELETE FROM assets WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Asset;