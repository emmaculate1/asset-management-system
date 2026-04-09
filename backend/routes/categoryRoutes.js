const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// @route   GET api/categories
// @desc    Get all categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/categories/mini/all
// @desc    Get all mini categories
router.get('/mini/all', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT mc.*, c.name as category_name 
      FROM mini_categories mc
      JOIN categories c ON mc.category_id = c.id
      ORDER BY c.name ASC, mc.name ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/categories/:id/mini
// @desc    Get mini categories for a specific category
router.get('/:id/mini', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM mini_categories WHERE category_id = ? ORDER BY name ASC', [req.params.id]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
