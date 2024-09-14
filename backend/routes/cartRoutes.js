const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

// Routes
router.get('/', auth, getCart);
router.post('/', auth, addToCart);
router.delete('/:id', auth, removeFromCart);

module.exports = router;