import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";

dotenv.config;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("server is running");
});
