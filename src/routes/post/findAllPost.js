import express from "express";
import findPostById from "../services/findPostById.js";

const router = express.Router();

router.get("/get/:userId", (req, res) => {
  const userId = req.params.userId;
  findPostById(userId).then((result) => {
    res.json(result);
  });
});

export default router;
