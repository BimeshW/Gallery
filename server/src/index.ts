import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.route"
import imageRoutes from "./routes/image.route"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/image", imageRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log(`App is listening on http://localhost:${PORT}`);
})
