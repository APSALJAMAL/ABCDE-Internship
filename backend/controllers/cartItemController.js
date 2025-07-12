import CartItem from '../models/CartItem.js';


export const createCartItem = async (req, res) => {
  try {
    const { cart_id, item_id } = req.body;

    if (!cart_id || !item_id ) {
      return res.status(400).json({ message: 'cart_id, item_id are required' });
    }

    const newCartItem = new CartItem({ cart_id, item_id});
    await newCartItem.save();

    res.status(201).json(newCartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await CartItem.find()
      .populate('cart_id')
      .populate('item_id');
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCartItemById = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id)
      .populate('cart_id')
      .populate('item_id');
    if (!cartItem) return res.status(404).json({ message: 'CartItem not found' });

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateCartItem = async (req, res) => {
  try {
    const { cart_id, item_id } = req.body;

    const cartItem = await CartItem.findById(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'CartItem not found' });

    if (cart_id) cartItem.cart_id = cart_id;
    if (item_id) cartItem.item_id = item_id;
    

    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteCartItem = async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ message: 'CartItem not found' });

    res.json({ message: 'CartItem deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
