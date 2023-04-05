import express from "express";
import { createChildPitch, deleteChildPitch, getChildPitch, getChildPitchs, updateChildPitch, updateChildPitchAvailability } from "../controllers/childPitchController.js";
import { verifyAdmin } from "../ultis/verifyToken.js";

const router = express.Router();
//CREATE
router.post("/:pitchid", verifyAdmin, createChildPitch);

//UPDATE
router.put("/availability/:id", updateChildPitchAvailability);

router.put("/:id", updateChildPitch);
//DELETE
router.delete("/:id/:pitchid", verifyAdmin, deleteChildPitch);
//GET

router.get("/:id", getChildPitch);
//GET ALL

router.get("/", getChildPitchs);

export default router;