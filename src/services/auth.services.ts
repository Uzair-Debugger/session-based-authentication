import bcrypt from "bcrypt"
import User from "../models/user.model.js";
import type {  signUpInterface } from "../interfaces/interface.js";
import type { Request, Response } from "express";

const handleSignup =async (req: Request<{},{}, signUpInterface>, res:Response) =>{
    try {
        
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
    
    return res.status(201).json({"message": "User signup Successfully", "userId": user.id})
} catch (error) {
    console.log(``)
}
    
}

export default handleSignup;

// LOGIN
export const handleLogin = async (req: Request<{},{}, signUpInterface>, res:Response) => {
    try {
        const { email, password } = req.body;

        // 1. Validate
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        // 2. Find user
        const user = await User.findOne({ where: { email } });
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 4. Create session
        req.session.userId = user.id;

        return res.json({
            message: "Login successful",
        });

    } catch (error) {
        console.error("Error:",error);
        return res.status(500).json({ message: "Server error" });
    }
};
