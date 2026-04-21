import express from "express";
import handleSignup, { handleLogin } from "../services/auth.services.js";

export const authRouter = express.Router()

authRouter.post('/signup', handleSignup);
authRouter.post('/login', handleLogin);