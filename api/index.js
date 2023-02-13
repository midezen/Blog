import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";

dotenv.config;

const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(8800, () => {
  console.log("server is running");
});
