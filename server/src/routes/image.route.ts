import express from "express"
import authMiddleware from "../middleware/authMiddleware";
import { deleteImage, uploadImage } from "../controller/image.controller";

const router = express.Router();

router.post("/upload", authMiddleware, uploadImage);
router.delete("/:id",authMiddleware, deleteImage);

export default router;