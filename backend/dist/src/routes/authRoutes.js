"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../lib/auth");
const node_1 = require("better-auth/node");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
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
router.get("/me", authMiddleware_1.requireAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(req.session);
}));
// All other auth endpoints (sign-up disabled, sign-in, etc.)
router.all("/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
exports.default = router;
