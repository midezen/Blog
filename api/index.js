import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import cookieParser from "cookie-parser";
import Cors from "cors";

dotenv.config;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(Cors());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("server is running");
});
