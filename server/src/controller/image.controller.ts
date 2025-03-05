import { Response } from "express";
import { AuthRequest } from "../types/types";
import Image from "../models/image.model";

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    const user = await req.user;
    const { cloudinaryUrl, title } = await req.body;

    if (!cloudinaryUrl) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const newImage = new Image({
      user: user?.user_id,
      cloudinaryUrl: cloudinaryUrl,
      title: title,
    });

    const uploadedImage = await newImage.save();
    if(!uploadImage) {
      res.status(400).json({
        success: false,
        message: "Failed to upload image"
      })
      return;
    }

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      uploadImage: uploadedImage
    });
    return;
  } catch (error) {
    console.log("Error uploading image", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
