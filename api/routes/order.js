import express from "express";
import { getOrders, intent, confirm, deleteOrder, createOrder, getOrder } from "../controllers/orderController.js";


const router = express.Router();

router.get('/', getOrders)
router.get('/:userId', getOrder)
router.post('/:orderMatchId', createOrder)
router.post("/create-payment-intent/:ordersId", intent)
router.put("/:id", confirm)
router.delete("/:id", deleteOrder)

export default router