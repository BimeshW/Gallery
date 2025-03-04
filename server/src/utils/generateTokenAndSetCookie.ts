import { Response } from "express";
import jwt from "jsonwebtoken";

interface GenerateTokenProps {
  user_id: string;
  res: Response;
}

export const generateTokenAndSetCookie = async ({
  user_id,
  res,
}: GenerateTokenProps) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "24h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  
};
