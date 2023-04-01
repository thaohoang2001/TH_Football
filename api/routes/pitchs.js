import express from "express";
import { createPitch, deletePitch, getAllPitch, getPitch, updatePitch } from "../controllers/pitchController.js";
import { verifyAdmin } from "../ultis/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createPitch)

//update
router.put("/:id", updatePitch)

//delete
router.delete("/:id", verifyAdmin, deletePitch)

//get
router.get("/find/:id", getPitch)

//get all
router.get("/", getAllPitch)



export default router