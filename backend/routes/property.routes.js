import { Router } from "express";
import { create, getAll, getOne, getMine, update, remove } from "../controllers/property.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get("/mine", authMiddleware, getMine);
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);

export default router;
