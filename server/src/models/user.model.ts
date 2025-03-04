import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document{
    username: string,
    passcode: string,
    image: string
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },

    passcode: {
        type: String,
        required: true,
    },

    image: {
        type: String,
    }
    
})

const User = mongoose.model<IUser>("User", userSchema);

export default User;