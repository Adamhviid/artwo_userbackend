import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import GetPost from "../../services/post/getById";
/* import verifyToken from '../../Middleware/verifyToken.js' */

const router = express.Router();

router.get(
  "/post/:id",
  /* verifyToken, */ async (res) => {
    const id = req.params.id;

    GetUser(post.id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

export default router;
