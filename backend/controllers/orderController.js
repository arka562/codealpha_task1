const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { shippingInfo, totalAmount } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const newOrder = new Order({
      userId: req.user.id,
      products: cart.products,
      totalAmount,
      shippingInfo,
    });

    await newOrder.save();
    await Cart.findByIdAndDelete(cart._id); // Clear the cart after order

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for a user
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};