import express from 'express';
import {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart
} from '../controllers/cartController.js';
import Cart from '../models/Cart.js';

const router = express.Router();


router.post('/', createCart);
router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);
router.post('/for-user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { $setOnInsert: { name: 'My Cart', status: 'active' } },
      { new: true, upsert: true }
    );

    res.json({
      id: cart._id,
      user_id: cart.user_id,
      name: cart.name,
      status: cart.status,
      created_at: cart.created_at,
    });
  } catch (err) {
    console.error('Error in /for-user/:userId:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
