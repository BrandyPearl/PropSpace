import { Router } from "express";
import { updateMe, updateMyPassword } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.put("/me", authMiddleware, updateMe);
router.put("/me/password", authMiddleware, updateMyPassword);

export default router;
