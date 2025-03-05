import { Response } from "express";
import { AuthRequest } from "../types/types";
import Image, { IImage } from "../models/image.model";
import User from "../models/user.model";

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

    const userId = user?.user_id;
    const newImage = new Image({
      user: userId,
      cloudinaryUrl: cloudinaryUrl,
      title: title,
    });

    const uploadedImage = await newImage.save();
    if (!uploadImage) {
      res.status(400).json({
        success: false,
        message: "Failed to upload image",
      });
      return;
    }

    const currUser = await User.findById(userId);
    currUser?.images.push(uploadedImage._id);
    await currUser?.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      uploadImage: uploadedImage,
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

export const deleteImage = async (req: AuthRequest, res: Response) => {
  try {
    const { id : image_id } = req.params;
    const user = req.user;

    const image = await Image.findById(image_id).select("user") as IImage;
    console.log(image);
    if (!image) {
      res.status(404).json({
        success: false,
        message: "Invalid image id",
      });
      return;
    }

    const userId = user?.user_id;
    const imageUploaderId = image.user.toString();

    if (userId != imageUploaderId) {
      res.status(401).json({
        success: false,
        message: "Only uploader can delete image",
      });
      return;
    }

    const deletedImage = await Image.findByIdAndDelete(image_id);
    if (!deletedImage) {
      res.status(400).json({
        success: false,
        message: "Failed to delete image",
      });
      return;
    }

    await User.updateMany(
      {
        images: image_id,
      },
      { $pull: { images: image_id } }
    );

    res.status(200).json({
      success: true,
      message: "Image deleted Successfully",
    });
  } catch (error) {
    console.log("Error deleting Images", error),
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
  }
};
