import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

export const register = async (req: Request, res: Response) => {
    try {
        const { nama, email, password } = req.body;

        if (!nama || !email || !password) {
            return res.status(400).json({ message: "Nama, email and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            nama,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id?.toString(), nama: user.nama, email: user.email }, JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id?.toString() }, REFRESH_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            message: "User registered successfully",
            token,
            refreshToken,
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id?.toString(), nama: user.nama, email: user.email }, JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id?.toString() }, REFRESH_SECRET, { expiresIn: "7d" });

        res.json({
            message: "Login successful",
            token,
            refreshToken,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        jwt.verify(refreshToken, REFRESH_SECRET, async (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }

            try {
                const user = await User.findById(decoded.id);
                if (!user) {
                    return res.status(403).json({ message: "User not found" });
                }

                const newToken = jwt.sign({ id: user._id?.toString(), nama: user.nama, email: user.email }, JWT_SECRET, { expiresIn: "15m" });
                const newRefreshToken = jwt.sign({ id: user._id?.toString() }, REFRESH_SECRET, { expiresIn: "7d" });

                res.json({
                    token: newToken,
                    refreshToken: newRefreshToken,
                });
            } catch (dbError) {
                console.error("Database error during token refresh:", dbError);
                res.status(500).json({ message: "Server error" });
            }
        });
    } catch (error) {
        console.error("Token refresh error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
