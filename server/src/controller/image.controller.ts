import { Response } from "express";
import { AuthRequest } from "../types/types";
import Image, { IImage } from "../models/image.model";
import User, { IUser } from "../models/user.model";
import { uploadToCloudinary } from "../utils/cloudinary";
import { getPublicIdFromUrl } from "../utils/getPublicIdFromImage";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

export const getImages = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = await req.user?.user_id;
    const user = await User.findById(user_id).populate("images");

    if (!user) {
      res.status(404).json({
        success: true,
        message: "User not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Image fetch successfully",
      image: user?.images,
    });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    const user = await req.user;
    const { title } = await req.body;
    let { cloudinaryUrl } = await req.body;

    if (cloudinaryUrl) {
      cloudinaryUrl = await uploadToCloudinary(cloudinaryUrl);
    } else {
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

    const uploadedImage: IImage = await newImage.save();
    if (!uploadImage) {
      res.status(400).json({
        success: false,
        message: "Failed to upload image",
      });
      return;
    }

    const uploadedImageId = uploadedImage._id as mongoose.Types.ObjectId;
    const currUser: IUser | null = await User.findById(userId);
    currUser?.images.push(uploadedImageId);
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
    const { id: image_id } = req.params;
    const user = req.user;

    const image = (await Image.findById(image_id).select("user")) as IImage;
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
    const imageToDelete = await Image.findById(image_id);
    if (!imageToDelete) {
      res.status(404).json({
        success: false,
        message: "Image not Found",
      });
      return;
    } else {
      const imagePublicId = getPublicIdFromUrl(imageToDelete?.cloudinaryUrl);
      cloudinary.uploader.destroy(imagePublicId!, {
        invalidate: true,
      });
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
