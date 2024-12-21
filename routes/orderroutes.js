import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders } from '../controllers/orderController.js';

 
const orderRouter = express.Router()

orderRouter.post('/placeorder', authMiddleware, placeOrder)
orderRouter.post('/verifyorder', verifyOrder)
orderRouter.get('/userorders', authMiddleware, userOrders)

export default orderRouter; 