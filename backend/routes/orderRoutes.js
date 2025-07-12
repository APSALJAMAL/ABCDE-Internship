import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  createOrderFromCart
} from '../controllers/orderController.js';

const router = express.Router();


router.post('/', createOrder);
router.get('/', getAllOrders);
router.post('/from-cart/:cartId', createOrderFromCart);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
