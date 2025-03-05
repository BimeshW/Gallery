import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, User } from "../types/types";

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await req.cookies.jwt;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized, No token Provided",
      });
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!) as User;
    if (!decodedToken) {
      res.status(401).json({
        success: false,
        message: "Unauthorized, Invalid token",
      });
      return;
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Error check authMiddleware", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default authMiddleware;
