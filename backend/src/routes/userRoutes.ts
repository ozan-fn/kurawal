import { Router } from "express";
import { getProfile } from "../controllers/userController";
import { requireAuth } from "../middlewares/authMiddleware";
import { auth } from "../lib/auth";
import { toNodeHandler } from "better-auth/node";

const router = Router();

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the current authenticated user's profile information
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 name:
 *                   type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.get("/profile", requireAuth, getProfile);

/**
 * @swagger
 * /api/auth/update-user:
 *   post:
 *     summary: Update user information
 *     description: Update the current authenticated user's profile information (name, image). Uses better-auth built-in endpoint.
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               image:
 *                 type: string
 *                 example: https://example.com/avatar.jpg
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     summary: Change user password
 *     description: Change the current authenticated user's password. Uses better-auth built-in endpoint.
 *     tags:
 *       - User
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *               - currentPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newpassword123
 *               currentPassword:
 *                 type: string
 *                 example: oldpassword123
 *               revokeOtherSessions:
 *                 type: boolean
 *                 example: true
 *                 description: When set to true, all other active sessions will be invalidated
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid current password
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

export default router;
