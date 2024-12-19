import express  from 'express';
import { foodCreate } from '../controllers/foodController.js';

const foodRouter = express.Router()

foodRouter.post('/api/createfood', foodCreate)


export default foodRouter;