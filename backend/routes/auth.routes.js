import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ message: "You are authenticated", user: req.user });
});

export default router;