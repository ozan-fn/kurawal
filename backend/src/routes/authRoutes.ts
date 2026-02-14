import { Router } from "express";
import { auth } from "../lib/auth";
import { toNodeHandler } from "better-auth/node";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * /api/auth/sign-in/email:
 *   post:
 *     summary: Login with email and password
 *     description: Authenticate user with email and password credentials using better-auth
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@kurawal.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful - Returns user and session
 *       400:
 *         description: Invalid email or password
 *       401:
 *         description: Email or password incorrect
 */

/**
 * @swagger
 * /api/auth/sign-out:
 *   post:
 *     summary: Logout user
 *     description: Logout the current authenticated user and clear session
 *     tags:
 *       - Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized - No active session
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user session
 *     description: Retrieve the current authenticated user's session information
 *     tags:
 *       - Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User session retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                 session:
 *                   type: object
 *       401:
 *         description: Unauthorized - Invalid or missing session
 */

router.get("/me", requireAuth, async (req, res) => {
    return res.json(req.session);
});

// All other auth endpoints (sign-up disabled, sign-in, etc.)
router.all("/*splat", toNodeHandler(auth));

export default router;
