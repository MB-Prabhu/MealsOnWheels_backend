import express  from 'express';
import { foodCreate, listFood, listOrders, updateOrders, removeFoodItems } from '../controllers/foodController.js';
import upload from '../utils/ImageUpload.js';

const foodRouter = express.Router()

foodRouter.post('/createfood',upload.single("image"), foodCreate)
foodRouter.get('/listfood', listFood)
foodRouter.delete('/removefood/:id', removeFoodItems)
foodRouter.get('/listorders', listOrders)
foodRouter.patch('/updateorderstatus', updateOrders)

export default foodRouter;