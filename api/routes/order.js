import express from "express";
import { getOrders, intent, confirm, deleteOrder } from "../controllers/orderController.js";


const router = express.Router();

// router.post('/:pitchId', createOrder)
router.get('/', getOrders)
router.post("/create-payment-intent/:id", intent)
router.put("/", confirm)
router.delete("/:id", deleteOrder)

export default router