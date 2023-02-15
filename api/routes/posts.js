import express from "express";
import { getPosts } from "../controllers/posts.js";

const router = express.Router();

// router.post("/create");

router.get("/", getPosts);

// router.get("/:id");

// router.put("/:id", );

// router.delete("/:id");

export default router;
