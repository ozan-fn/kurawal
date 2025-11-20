import { Router } from "express";
import { getUploadSignature, getListMedia, deleteMedia } from "../controllers/mediaController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signature", authenticateToken, getUploadSignature);
router.get("/listmedia", authenticateToken, getListMedia);
router.delete("/delete", authenticateToken, deleteMedia);



export default router;