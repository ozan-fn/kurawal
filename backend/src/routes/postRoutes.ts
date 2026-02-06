import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../controllers/postController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", requireAuth, getPosts);
router.get("/:id", requireAuth, getPost);
router.post("/", requireAuth, createPost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

export default router;
