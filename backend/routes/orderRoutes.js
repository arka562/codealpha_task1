const express = require('express');
const router = express.Router();
const { createOrder, getOrder, getAllOrders } = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

// Routes
router.post('/', auth, createOrder);
router.get('/:id', auth, getOrder);
router.get('/', auth, getAllOrders);

module.exports = router;