import express  from 'express';
import { foodCreate, listFood, listOrders, updateOrders, removeFoodItems, adminLogin } from '../controllers/foodController.js';
import upload from '../utils/ImageUpload.js';
import { adminAuthMiddleware } from '../middleware/auth.js';

const foodRouter = express.Router()

foodRouter.post('/createfood',adminAuthMiddleware,upload.single("image"), foodCreate)
foodRouter.get('/listfood', listFood)
foodRouter.delete('/removefood/:id', removeFoodItems)
foodRouter.get('/listorders', listOrders)
foodRouter.patch('/updateorderstatus', updateOrders)
foodRouter.post('/adminlogin', adminLogin)

export default foodRouter;