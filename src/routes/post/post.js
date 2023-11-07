import express from "express";
import Post from "../services/post.js";

const router = express.Router();

router.post("/post", (req, res) => {
  const post = req.body;
  res.send(Post(post));
});

export default router;
