import { Request } from "express";

export interface User {
  user_id : string;
}

export interface AuthRequest extends Request {
  user?:User
}