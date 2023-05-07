import express from "express";
import {
    createChildPitch,
    deleteChildPitch, getChildPitch,
    postChildPitchFilter,getChildPitchs,  updateChildPitch, updateChildPitchAvailability
} from "../controllers/childPitchController.js";


const router = express.Router();
//CREATE
router.post("/create/:pitchid", createChildPitch);
    
//UPDATE
router.put("/availability/:id", updateChildPitchAvailability);

router.put("/:id", updateChildPitch);
//DELETE
router.delete("/:id/:pitchid", deleteChildPitch);
//GET
router.get("/:id", getChildPitch);
//GET ALL
router.get("/:id", getChildPitchs);

router.post("/filter", postChildPitchFilter);

export default router;