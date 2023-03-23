import express from "express";
import { createChildPitch, deleteChildPitch, getAllchildPitch, getChildPitch, updateChildPitch, updateChildPitchAvailability } from "../controllers/childPitchController.js";
import { verifyAdmin } from "../ultis/verifyToken.js";

const router = express.Router();


//Create
router.post("/:pitchid", verifyAdmin, createChildPitch)

//update
router.put("/availability/:id",  updateChildPitchAvailability)
router.put("/:id", verifyAdmin, updateChildPitch)

//delete
router.delete("/:id/:pitchid", verifyAdmin, deleteChildPitch)

//get
router.get("/:id", getChildPitch)

//get all
router.get("/", getAllchildPitch)

export default router