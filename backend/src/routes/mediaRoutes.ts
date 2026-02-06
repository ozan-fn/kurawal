import { Router } from "express";
import { getUploadSignature, getListMedia, deleteMedia } from "../controllers/mediaController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signature", requireAuth, getUploadSignature);
router.get("/listmedia", requireAuth, getListMedia);
router.delete("/delete", requireAuth, deleteMedia);

export default router;
