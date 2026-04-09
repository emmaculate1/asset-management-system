const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// @route   GET api/assets
// @desc    Get all assets with category names
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, mc.name as mini_category_name, c.name as category_name
      FROM assets a
      LEFT JOIN mini_categories mc ON a.mini_category_id = mc.id
      LEFT JOIN categories c ON mc.category_id = c.id
      ORDER BY a.id DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/assets
// @desc    Create a new asset
router.post('/', async (req, res) => {
  const { name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO assets (name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, category, serialNumber, purchaseDate, status || 'Available', assignedTo, mini_category_id]
    );
    res.json({ id: result.insertId, name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/assets/:id
// @desc    Update an asset
router.put('/:id', async (req, res) => {
  const { name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id } = req.body;
  try {
    await pool.query(
      'UPDATE assets SET name = ?, category = ?, serialNumber = ?, purchaseDate = ?, status = ?, assignedTo = ?, mini_category_id = ? WHERE id = ?',
      [name, category, serialNumber, purchaseDate, status, assignedTo, mini_category_id, req.params.id]
    );
    res.json({ message: 'Asset updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/assets/:id
// @desc    Delete an asset
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM assets WHERE id = ?', [req.params.id]);
    res.json({ message: 'Asset deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
