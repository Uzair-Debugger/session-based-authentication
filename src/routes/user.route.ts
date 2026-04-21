import express from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { handleProfile } from '../services/user.service.js';

export const userRouter = express.Router()
userRouter.use(requireAuth)

userRouter.get('/profile', handleProfile)