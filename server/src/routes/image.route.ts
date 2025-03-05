import express from "express"
import authMiddleware from "../middleware/authMiddleware";
import { uploadImage } from "../controller/image.controller";

const router = express.Router();

router.post("/upload", authMiddleware, uploadImage);

export default router;