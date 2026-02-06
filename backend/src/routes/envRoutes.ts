import { Router } from "express";
import { getEnvs, getEnv, createEnv, updateEnv, deleteEnv } from "../controllers/envController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", requireAuth, getEnvs);
router.get("/:id", requireAuth, getEnv);
router.post("/", requireAuth, createEnv);
router.put("/:id", requireAuth, updateEnv);
router.delete("/:id", requireAuth, deleteEnv);

export default router;
