import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { getTags, getTag, createTag, updateTag, deleteTag } from "../controllers/tagController";

const router = Router();

router.get("/", authenticateToken, getTags);
router.get("/:id", authenticateToken, getTag);
router.post("/", authenticateToken, createTag);
router.put("/:id", authenticateToken, updateTag);
router.delete("/:id", authenticateToken, deleteTag);

export default router;
  