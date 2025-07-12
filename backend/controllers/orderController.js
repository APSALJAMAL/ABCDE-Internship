import Cart from '../models/Cart.js';
import CartItem from '../models/CartItem.js';
import Order from '../models/Order.js';


export const createOrder = async (req, res) => {
  try {
    const { cart_id, user_id } = req.body;

    if (!cart_id || !user_id) {
      return res.status(400).json({ message: 'cart_id and user_id are required' });
    }

    const newOrder = new Order({ cart_id, user_id });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('cart_id')
      .populate('user_id', 'username');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('cart_id')
      .populate('user_id', 'username');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateOrder = async (req, res) => {
  try {
    const { cart_id, user_id } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (cart_id) order.cart_id = cart_id;
    if (user_id) order.user_id = user_id;

    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const createOrderFromCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const order = new Order({
      cart_id: cart._id,
      user_id: cart.user_id, 
      status: 'pending',
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order from cart:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
