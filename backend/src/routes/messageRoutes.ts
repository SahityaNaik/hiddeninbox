import { Router } from "express";
import {
  sendMessage,
  getMyMessages,
  deleteMessage,
  getStats,
} from "../controllers/messageController";
import { auth } from "../middleware/authMiddleware";

const router = Router();

// Anyone can send anonymous message to a username
router.post("/:username", sendMessage);
router.get("/my", auth, getMyMessages);
router.delete("/:id", auth, deleteMessage);
router.get("/stats", auth, getStats);

export default router;
