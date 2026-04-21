import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import dotenv from 'dotenv'
import { error } from "node:console";
dotenv.config()

if(!process.env.REDIS_URL){
    throw new Error("REDIS_URL is not defined in environment variables")
}

// Create Redis Client
const redisClient = createClient({
    url: process.env.REDIS_URL,
})

redisClient.on("error", (error)=>{
    console.log(`Redis Error ${error}`)
})

try {
  await redisClient.connect();
  console.log("Redis connected");
} catch (err) {
  console.error("Redis connection failed", err);
  process.exit(1);
}


// Create Session Store
const redisStore = new RedisStore({
    client: redisClient,
})

export default redisStore;
