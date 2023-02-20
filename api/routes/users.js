import express from "express";
import { getUser, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUser);
router.put("/:id", updateUser);

export default router;
