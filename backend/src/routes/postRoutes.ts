import { Router } from "express";
import { getPosts, getPost, createPost, updatePost, deletePost } from "../controllers/postController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, getPosts);
router.get("/:id", authenticateToken, getPost);
router.post("/", authenticateToken, createPost);
router.put("/:id", authenticateToken, updatePost);
router.delete("/:id", authenticateToken, deletePost);

export default router;
