import express  from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import { authMiddleware } from '../middleware/auth.js';

const cartRouter = express.Router()

cartRouter.patch('/addtocart',  authMiddleware, addToCart)
cartRouter.patch('/removecartitem',  authMiddleware, removeFromCart)
cartRouter.get('/getcartitems', authMiddleware,  getCartItems)

export default cartRouter;