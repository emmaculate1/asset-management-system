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
    const [rows] = await pool.execute(`
      SELECT a.*, c.name as category_name, mc.name as mini_category_name 
      FROM assets a 
      LEFT JOIN categories c ON a.category = c.name 
      LEFT JOIN mini_categories mc ON a.mini_category_id = mc.id 
      ORDER BY a.id DESC
    `);
    return rows;
  }

  static async create(data) {
    const { name, category, serialNumber, purchaseDate, status = 'Available', assignedTo = null, mini_category_id = null } = data;
    const [result] = await pool.execute(
      'INSERT INTO assets (name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id]
    );
    return { id: result.insertId, ...data };
  }

  static async findByIdAndUpdate(id, data) {
    const { name, category, serialNumber, purchaseDate, status, assignedTo = null, mini_category_id = null } = data;
    await pool.execute(
      'UPDATE assets SET name = ?, category = ?, serialNumber = ?, purchaseDate = ?, status = ?, assignedTo = ?, mini_category_id = ? WHERE id = ?',
      [name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id, id]
    );
    return { id, ...data };
  }

  static async findByIdAndDelete(id) {
    await pool.execute('DELETE FROM assets WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Asset;