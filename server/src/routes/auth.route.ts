import express from "express";
import { signIn, signUp, signOut, getCurrentAuthUser } from "../controller/auth.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", signUp)
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/me", authMiddleware,getCurrentAuthUser);


export default router;