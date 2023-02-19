import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/posts.js";
import cookieParser from "cookie-parser";
import Cors from "cors";
import multer from "multer";

dotenv.config;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(Cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("server is running");
});
