//EXPRESS
import express from "express";
const app = express();
app.set("trust proxy", 1);

import "dotenv/config"; //DOTENV
import cookieParser from "cookie-parser"; //Cookie Parse

//SECURITY
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import cors from "cors"; //CORS

import { connectDB } from "./config/db.js"; //DB

import authUser from "./routes/authRoute.js"; //AUTH
import postCRUD from "./routes/postRoute.js"; //POST
import commentCRUD from "./routes/commentRoute.js"; //COMMENT

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Too many requests, try again later.",
//   })
// );

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // tighter limit for login attempts
  message: "Too many login attempts. Please try again later.",
});

// Apply only to login route
app.use("/api/auth/login", loginLimiter);
app.use("/api/auth/register", loginLimiter);
app.use("/api/auth", authUser);
app.use("/api/post", postCRUD);
app.use("/api", commentCRUD);

//PORT
const PORT = process.env.PORT || 3000;

//LISTENING TO POSR
app.listen(PORT, () => {
  console.log("Listening to Port,", PORT);
  connectDB();
});
