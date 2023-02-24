import express from "express";
import {
  addComment,
  getComments,
  updateComment,
} from "../controllers/comments.js";

const router = express.Router();

router.post("/create", addComment);
router.get("/", getComments);
router.put("/:id", updateComment);

export default router;
