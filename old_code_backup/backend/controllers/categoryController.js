const Category = require('../models/Category');
const MiniCategory = require('../models/MiniCategory');

// Category Controllers
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const miniCategories = await Category.getMiniCategories(req.params.id);
    res.json({ ...category, miniCategories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mini Category Controllers
exports.getAllMiniCategories = async (req, res) => {
  try {
    const miniCategories = await MiniCategory.findAll();
    res.json(miniCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMiniCategoriesByCategory = async (req, res) => {
  try {
    const miniCategories = await MiniCategory.findByCategory(req.params.categoryId);
    res.json(miniCategories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMiniCategory = async (req, res) => {
  try {
    const newMiniCategory = await MiniCategory.create(req.body);
    res.status(201).json(newMiniCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMiniCategory = async (req, res) => {
  try {
    const updatedMiniCategory = await MiniCategory.findByIdAndUpdate(req.params.id, req.body);
    res.json(updatedMiniCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMiniCategory = async (req, res) => {
  try {
    await MiniCategory.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mini category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
