import express  from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController';
import { authMiddleware } from '../middleware/auth';

const cartRouter = express.Router()

cartRouter.post('/addtocart',  authMiddleware, addToCart)
cartRouter.post('/removecartitem',  authMiddleware, removeFromCart)
cartRouter.post('/getcartitems', authMiddleware,  getCartItems)

export default cartRouter;