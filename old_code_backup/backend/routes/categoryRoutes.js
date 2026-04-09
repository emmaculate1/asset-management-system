const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateAdmin } = require('../middleware/auth');

// Apply authentication middleware to all category routes
router.use(authenticateAdmin);

// Category routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

// Mini category routes
router.get('/mini/all', categoryController.getAllMiniCategories);
router.get('/:categoryId/mini', categoryController.getMiniCategoriesByCategory);
router.post('/mini', categoryController.createMiniCategory);
router.put('/mini/:id', categoryController.updateMiniCategory);
router.delete('/mini/:id', categoryController.deleteMiniCategory);

module.exports = router;
