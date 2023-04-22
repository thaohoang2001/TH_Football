import express from "express";
import { createPitch, deletePitch, getAllPitch, getPitch, getPitchOfChildPitch, updatePitch } from "../controllers/pitchController.js";


const router = express.Router();

//Create
router.post("/",  createPitch)

//update
router.put("/:id", updatePitch)

//delete
router.delete("/:id",  deletePitch)

//get
router.get("/find/:id", getPitch)

//get all
router.get("/", getAllPitch)

router.get("/childPitch/:id", getPitchOfChildPitch);



export default router