import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import { generateRandomImage } from "../utils/generateImage";
import { checkPasscode, hashPassword } from "../utils/hashPassword";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";

interface SignUpRequestBody {
  username: string;
  passcode: string;
  image?: string;
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, passcode } = (await req.body) as SignUpRequestBody;
    let { image } = await req.body;

    if (!username || !passcode) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    if (passcode.length < 6) {
      res.status(422).json({
        success: false,
        message: "Passcode Should be atleast 6 character long",
      });
      return;
    }

    const user: IUser | null = await User.findOne({ username });
    if (user) {
      res.status(409).json({
        success: false,
        message: "User already Existed, Please Login",
      });
      return;
    }

    if (!image) {
      image = generateRandomImage();
    }

    const hashedPasscode = await hashPassword(passcode);
    if (!hashedPasscode) {
      res.status(500).json({
        success: false,
        message: "Error hashing Passcode",
      });
      return;
    }

    const newUser = new User({
      username,
      passcode: hashedPasscode,
      image,
    });

    newUser.save();

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user: newUser,
    });
    return;
  } catch (error) {
    console.log("Error creating User", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { username, passcode } = await req.body;
  
    if (!username || !passcode) {
      res.status(400).json({
        success: false,
        message: "Please provide all the fileds",
      });
      return;
    }
  
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found, Please signup first",
      });
      return;
    }
  
    const user_passcode = user.passcode;
    const isPassCorrect = await checkPasscode({ passcode, user_passcode });
    if (!isPassCorrect) {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
      return;
    }
  
    const user_id = user._id as string;
    await generateTokenAndSetCookie({ user_id, res });
  
    res.status(200).json({
      success: true,
      message: "User login successfully",
    });
    return;
  } catch (error) {
    console.log("Error in signin", error),
    res.status(500).json({
      success: false,
      message: "Internal server error"
    })
    return;
  }
};

export const signOut = () => {};
