import { Router } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { requireAuth } from "../middlewares/authMiddleware";

const router = Router();

router.get("/me", requireAuth, async (req, res) => {
    return res.json(req.session);
});
router.all("/*splat", toNodeHandler(auth));

export default router;
