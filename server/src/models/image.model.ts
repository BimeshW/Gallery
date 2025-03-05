import mongoose, { Schema } from "mongoose";

export interface IImage {
  user: mongoose.Types.ObjectId;
  cloudinaryUrl: string;
  title?: string;
  uploadedAt: Date;
}

const imageSchema = new Schema<IImage>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
  
});

const Image = mongoose.model("Image", imageSchema);

export default Image;
