import React, { SetStateAction } from "react";

export interface User {
  username: string;
  passcode: string;
  profilePicture: string;
  images: string[];
  createdAt: string;
}
export interface SignUpCredentials {
  username: string;
  passcode: string;
  image?: string;
}

export interface SignInCredentials {
  username: string;
  passcode: string;
}

export interface ResponseType {
  success: boolean;
  message: string;
  user: User;
}

export interface ToastTypes {
  message: string;
  type: "success" | "error";
}

export interface AuthDialogTypes {
  isDialogOpen: boolean;
  type: "sign-up" | "sign-in";
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

export interface NavbarProps {
  setIsDialogOpen?: React.Dispatch<SetStateAction<boolean>>;
  setAuthDialogType?: React.Dispatch<SetStateAction<"sign-up" | "sign-in">>;
}

export interface IImage {
  _id: string;
  user: string;
  cloudinaryUrl: string;
  title?: string;
  uploadedAt: Date;
}

export interface fetchImageTypes {
  success: boolean;
  message: string;
  image: IImage[];
}
