import { db } from "../db.js";

export const addComment = (req, res) => {
  const q = "INSERT INTO comments (`desc`, `uid`, `postid`, `date`) VALUES (?)";
  const values = [req.body.desc, req.body.uid, req.body.postid, req.body.date];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("Comment added successfully");
  });
};

export const getComments = (req, res) => {
  const postID = req.query._id;
  const q =
    "SELECT `username`, `img`, `desc`, `date` FROM comments c join users u ON  c.uid = u.id WHERE c.postid = ?";

  db.query(q, [postID], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};
