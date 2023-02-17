import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";

  db.query(q, req.query.cat, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT  `username`, `title`, `desc`, `postImg`, `img`, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You're not authenticated");

  jwt.verify(token, process.env.jwtSEC, (err, userInfo) => {
    if (err) return res.status(403).json("invalid token");

    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

    db.query(q, [postId, userInfo.id], (err, data) => {
      if (err)
        return res.status(403).json("You're not allowed to delete this post");

      return res.status(200).json("Post deleted successfully");
    });
  });
};
