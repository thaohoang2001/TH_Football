import express from "express";
import {
  createConversation,
  deleteConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversationController.js";
import { verifyToken } from "../ultis/verifyToken.js";


const router = express.Router();

router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);
router.delete("/:id", deleteConversation);

export default router;
