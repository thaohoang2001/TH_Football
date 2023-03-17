import express from "express";
import { createPitch, deletePitch, getAllPitch, getPitch, updatePitch, countByCity, countByType } from "../controllers/pitchController.js";
import { verifyAdmin } from "../ultis/verifyToken.js";

const router = express.Router();

//Create
router.post("/", verifyAdmin, createPitch)

//update
router.put("/:id", verifyAdmin, updatePitch)

//delete
router.delete("/:id", verifyAdmin, deletePitch)

//get
router.get("/find/:id", getPitch)

//get all
router.get("/", getAllPitch)

router.get("/countByCity", countByCity)
router.get("/countByType", countByType)

export default router