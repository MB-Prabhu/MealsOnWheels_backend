import express  from 'express';
import { foodCreate, listFood } from '../controllers/foodController.js';
import upload from '../utils/ImageUpload.js';

const foodRouter = express.Router()

foodRouter.post('/createfood',upload.single("image"), foodCreate)
foodRouter.get('/listfood', listFood)

export default foodRouter;