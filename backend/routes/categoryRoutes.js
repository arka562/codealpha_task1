const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById, createCategory } = require('../controllers/categoryController');

// Routes
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);

module.exports = router;