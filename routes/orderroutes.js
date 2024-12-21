import express from 'express';
import { authMiddleware } from '../middleware/auth';


const orderRouter = express.Router()

orderRouter.post('/placeorder', authMiddleware, )

export default orderRouter; 