import express  from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post('/userregister',registerUser)
userRouter.post('/userlogin', loginUser)

export default userRouter;