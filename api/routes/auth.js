import express from "express";
import { getAllUser, getUser, register, updateUser } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";

const router = express.Router();

//Register
router.post('/register', register)

//Login
router.post('/login', login)

//Get User
router.get('/find/:id', getUser)
router.get('/', getAllUser)

//Update User
router.put("/:id", updateUser)


export default router