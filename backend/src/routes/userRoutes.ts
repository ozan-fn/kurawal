import { Router } from "express";
import { getProfile } from "../controllers/userController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", requireAuth, getProfile);

export default router;
