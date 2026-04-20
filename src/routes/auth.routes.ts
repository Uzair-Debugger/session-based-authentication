import express from "express";
import handleSignup from "../services/auth.services.js";

export const authRouter = express.Router()

authRouter.post('/signup', handleSignup)