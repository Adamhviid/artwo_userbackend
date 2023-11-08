import express from "express";
import deleteById from "../../services/post/crud/deletePost.js";
import getAllPost from "../../services/post/crud/getAllPost.js";
import getPost from "../../services/post/crud/getPost.js";
import updatePost from "../../services/post/crud/updatePost.js";
import createPost from "../../services/post/crud/createPost.js";

/* import verifyToken from '../../Middleware/verifyToken.js' */

const router = express.Router();

router.get("/all", async (req, res) => {
  getAllPost()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  deleteById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get(
  "/get/:id",
  /* verifyToken, */ async (req, res) => {
    const id = req.params.id;

    getPost(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

router.post("/update/:id", async (req, res) => {
  const id = req.params.id;

  updatePost(id, req)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/create", async (req, res) => {
  try {
    const { title, content, tags, userId } = req.body;

    const result = await createPost(req);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
