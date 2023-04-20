import express from "express";
import { createOrderMatch, deleteOrderMatch, getOrderFindMatchs, getOrderMatch, getOrderMatchs, updateOrderMatch } from "../controllers/matchingController.js";

const router = express.Router();

router.post("/", createOrderMatch);

router.get("/:id", getOrderMatch);

router.get("/", getOrderMatchs);

router.post("/findMatch", getOrderFindMatchs);

router.put("/:id", updateOrderMatch);

router.delete("/:id", deleteOrderMatch);


export default router