import express from "express";
import { register,login,logout, getOtherUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/",isAuthenticated,getOtherUser);


export default router;