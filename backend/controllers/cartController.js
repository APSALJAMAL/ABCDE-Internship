import Cart from '../models/Cart.js';


export const createCart = async (req, res) => {
  try {
    const { user_id, name, status } = req.body;

    const newCart = new Cart({ user_id, name, status });
    await newCart.save();

    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find().populate('user_id', 'username');
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('user_id', 'username');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateCart = async (req, res) => {
  try {
    const { name, status, user_id } = req.body;

    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    if (name) cart.name = name;
    if (status) cart.status = status;
    if (user_id) cart.user_id = user_id;

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
