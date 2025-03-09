import mongoose, { Document, Schema } from "mongoose";

export interface IImage extends Document {
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
    default: Date.now,
  },
});

// Exporting Model
const Image = mongoose.model<IImage>("Image", imageSchema);
export default Image