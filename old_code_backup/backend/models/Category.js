const pool = require('./Asset').pool;

class Category {
  static async findAll() {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(data) {
    const { name, description } = data;
    const [result] = await pool.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return { id: result.insertId, name, description };
  }

  static async findByIdAndUpdate(id, data) {
    const { name, description } = data;
    await pool.execute(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    return { id, ...data };
  }

  static async findByIdAndDelete(id) {
    await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    return true;
  }

  static async getMiniCategories(categoryId) {
    const [rows] = await pool.execute(
      'SELECT * FROM mini_categories WHERE category_id = ? ORDER BY name',
      [categoryId]
    );
    return rows;
  }
}

module.exports = Category;
