import { Router } from "express";
import { getEnvs, getEnv, createEnv, updateEnv, deleteEnv } from "../controllers/envController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getEnvs);
router.get("/:id", authenticateToken, getEnv);
router.post("/", authenticateToken, createEnv);
router.put("/:id", authenticateToken, updateEnv);
router.delete("/:id", authenticateToken, deleteEnv);

export default router;