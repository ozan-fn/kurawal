import express from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

declare global {
    namespace Express {
        interface Request {
            user?: any;
            session?: any;
        }
    }
}

export interface AuthRequest extends express.Request {
    user?: any;
    session?: any;
}

// Middleware untuk cek authentication
export const requireAuth = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = session.user;
        req.session = session;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid session" });
    }
};
