import type {  signUpInterface } from "../interfaces/interface.js";
import dbConfig from "../config/dbConfig.js";
import type { Request, Response } from "express";

const handleSignup = (req: Request<{},{}, signUpInterface>, res:Response) =>{
    const {name, email} = req.body
    console.log(`Name is ${name}, email is ${email}`)
   

    return res.json({"message": `Received name: ${name}, email: ${email}`})   
}

export default handleSignup;