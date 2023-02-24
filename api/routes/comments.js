import express from "express";
import { addComment, getComments } from "../controllers/comments.js";

const router = express.Router();

router.post("/create", addComment);
router.get("/", getComments);

export default router;
