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

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 15 * 60 * 1000 }); // 15 minutes
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

        res.status(201).json({
            message: "User registered successfully",
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

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 15 * 60 * 1000 }); // 15 minutes
        res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 days

        res.json({
            message: "Login successful",
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

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

                res.cookie("token", newToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 15 * 60 * 1000 });
                res.cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 7 * 24 * 60 * 60 * 1000 });

                res.json({
                    message: "Token refreshed successfully",
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

export const logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        // Assuming authenticateToken middleware is used, req.user should be set
        const user = (req as any).user;
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        res.json({ id: user.id, nama: user.nama, email: user.email });
    } catch (error) {
        console.error("Me error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
