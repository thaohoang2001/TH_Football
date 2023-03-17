import express from "express";
import { updateUser, deleteUser, getUser, getAllUser} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../ultis/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("Helo user,you log")
// })

// router.get("/checkuser/:id",verifyUser, (req, res, next) => {
//     res.send("Helo user,you login")
// })

// router.get("/checkadmin/:id",verifyAdmin, (req, res, next) => {
//     res.send("Helo admin,you log")
// })

//update
router.put("/:id", verifyUser, updateUser)

//delete
router.delete("/:id", verifyUser, deleteUser)

//get
router.get("/:id", verifyUser, getUser)

//get all
router.get("/", verifyAdmin, getAllUser)


export default router