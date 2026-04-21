import session from "express-session";
import dotenv from "dotenv";
import redisStore from "../config/redisConfig.js";

dotenv.config();

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required");
}

const createSession = session({
  store: redisStore, 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV==='prodcution',
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24,
  },
});

export default createSession;