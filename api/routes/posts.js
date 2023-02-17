import express from "express";
import { getPosts, getPost, deletePost } from "../controllers/posts.js";

const router = express.Router();

// router.post("/create");

router.get("/", getPosts);

router.get("/:id", getPost);

// router.put("/:id", );

router.delete("/:id", deletePost);

export default router;
