"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const envController_1 = require("../controllers/envController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/envs:
 *   get:
 *     summary: Get all environment variables
 *     description: Retrieve a list of all environment configurations
 *     tags:
 *       - Environment
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Environment variables retrieved successfully
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new environment variable
 *     description: Create a new environment configuration
 *     tags:
 *       - Environment
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - key
 *               - value
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       201:
 *         description: Environment variable created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/envs/{id}:
 *   get:
 *     summary: Get a specific environment variable
 *     description: Retrieve an environment variable by ID
 *     tags:
 *       - Environment
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Environment variable ID
 *     responses:
 *       200:
 *         description: Environment variable retrieved successfully
 *       404:
 *         description: Environment variable not found
 *       401:
 *         description: Unauthorized
 *   put:
 *     summary: Update an environment variable
 *     description: Update an existing environment configuration
 *     tags:
 *       - Environment
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Environment variable ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Environment variable updated successfully
 *       404:
 *         description: Environment variable not found
 *       401:
 *         description: Unauthorized
 *   delete:
 *     summary: Delete an environment variable
 *     description: Delete an environment variable by ID
 *     tags:
 *       - Environment
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Environment variable ID
 *     responses:
 *       200:
 *         description: Environment variable deleted successfully
 *       404:
 *         description: Environment variable not found
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware_1.requireAuth, envController_1.getEnvs);
router.get("/:id", authMiddleware_1.requireAuth, envController_1.getEnv);
router.post("/", authMiddleware_1.requireAuth, envController_1.createEnv);
router.put("/:id", authMiddleware_1.requireAuth, envController_1.updateEnv);
router.delete("/:id", authMiddleware_1.requireAuth, envController_1.deleteEnv);
exports.default = router;
