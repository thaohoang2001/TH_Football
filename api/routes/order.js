import express from "express";
import { getOrders, intent, confirm, deleteOrder, createOrder } from "../controllers/orderController.js";


const router = express.Router();

router.get('/', getOrders)
router.post('/:orderMatchId', createOrder)
router.post("/create-payment-intent/:id", intent)
router.put("/", confirm)
router.delete("/:id", deleteOrder)

export default router