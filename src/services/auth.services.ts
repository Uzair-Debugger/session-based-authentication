import bcrypt from "bcrypt"
import User from "../models/user.model.js";
import type {  signUpInterface } from "../interfaces/interface.js";
import type { Request, Response } from "express";

const handleSignup =async (req: Request<{},{}, signUpInterface>, res:Response) =>{
    const {name, email, password} = req.body
    
    if(!name || !email || !password){
        
        return res.status(400).json({"message": `Missing input! Please fill all input fields`})
    }

    const existingUser= await User.findOne({where: {email}});
    
    if(existingUser){
        return res.status(400).json({"message": "User already exist"})
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashPassword
    });
    
    return res.status(201).json({"message": "User signup Successfully"})

}

export default handleSignup;