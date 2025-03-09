import express from "express"
import authMiddleware from "../middleware/authMiddleware";
import { deleteImage, getImages, uploadImage } from "../controller/image.controller";

const router = express.Router();

router.get("/get", authMiddleware, getImages);
router.post("/upload", authMiddleware, uploadImage);
router.delete("/:id",authMiddleware, deleteImage);

export default router;