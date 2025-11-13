import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless function invocations.
 */
let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            console.log("Connected to MongoDB");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

// Middleware to connect to database for each request
export const connectDB = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await dbConnect();
        next();
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ message: "Database connection failed" });
    }
};

export default dbConnect;
