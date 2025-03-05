import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  passcode: string;
  profilePicture: string;
  images: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  passcode: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
