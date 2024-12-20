import express  from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController';

const cartRouter = express.Router()

cartRouter.post('/addtocart', addToCart)
cartRouter.post('/removecartitem', removeFromCart)
cartRouter.post('/getcartitems', getCartItems)

export default cartRouter;