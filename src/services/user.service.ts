import type { Request, Response } from "express";
import User from "../models/user.model.js";

export const handleProfile = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.session.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user });

    } catch (err) {
        return res.status(500).json({ message: "Server error" });
    }
};