import { Router } from "express";
import { getTags, getTag, createTag, updateTag, deleteTag } from "../controllers/tagController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", requireAuth, getTags);
router.get("/:id", requireAuth, getTag);
router.post("/", requireAuth, createTag);
router.put("/:id", requireAuth, updateTag);
router.delete("/:id", requireAuth, deleteTag);

export default router;
