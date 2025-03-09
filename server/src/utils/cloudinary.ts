import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (imageUrl: string) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl, {
      folder: "Gallery-mern-project",
      format:"webp"
    });

    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Cloudinary Uplod failed");
  }
};
