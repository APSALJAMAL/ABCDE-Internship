import express from 'express';
import {
  createCartItem,
  getAllCartItems,
  getCartItemById,
  updateCartItem,
  deleteCartItem
} from '../controllers/cartItemController.js';
import mongoose from 'mongoose';
import CartItem from '../models/CartItem.js';
const router = express.Router();


router.post('/', createCartItem);
router.get('/', getAllCartItems);
router.get('/:id', getCartItemById);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

router.get('/for-cart/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: 'Invalid cart ID.' });
    }

    const items = await CartItem.find({ cart_id: cartId })
      .populate({
        path: 'item_id',
        select: 'name status created_at'
      })
      .lean();

    return res.status(200).json(items || []);
    
  } catch (err) {
    console.error('Error fetching cart items:', err);
    return res.status(500).json({ message: 'Server error. Could not fetch cart items.' });
  }
});


export default router;
