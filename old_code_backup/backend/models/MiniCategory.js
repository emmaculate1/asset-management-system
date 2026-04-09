const pool = require('./Asset').pool;

class MiniCategory {
  static async findAll() {
    const [rows] = await pool.execute(`
      SELECT mc.*, c.name as category_name 
      FROM mini_categories mc 
      JOIN categories c ON mc.category_id = c.id 
      ORDER BY c.name, mc.name
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT mc.*, c.name as category_name 
      FROM mini_categories mc 
      JOIN categories c ON mc.category_id = c.id 
      WHERE mc.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByCategory(categoryId) {
    const [rows] = await pool.execute(
      'SELECT * FROM mini_categories WHERE category_id = ? ORDER BY name',
      [categoryId]
    );
    return rows;
  }

  static async create(data) {
    const { name, category_id, description } = data;
    const [result] = await pool.execute(
      'INSERT INTO mini_categories (name, category_id, description) VALUES (?, ?, ?)',
      [name, category_id, description]
    );
    return { id: result.insertId, name, category_id, description };
  }

  static async findByIdAndUpdate(id, data) {
    const { name, category_id, description } = data;
    await pool.execute(
      'UPDATE mini_categories SET name = ?, category_id = ?, description = ? WHERE id = ?',
      [name, category_id, description, id]
    );
    return { id, ...data };
  }

  static async findByIdAndDelete(id) {
    await pool.execute('DELETE FROM mini_categories WHERE id = ?', [id]);
    return true;
  }
}

module.exports = MiniCategory;
