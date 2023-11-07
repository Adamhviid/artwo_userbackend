// DET HER BURDE NOK VÆRE I ADMIN BACKEND

import express from "express";
import deletePostByUid from "../services/deletePostByUid.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.delete(
  "/delete/:uid",
  /* verifyToken, */ async (req, res) => {
    try {
      await deletePostByUid(req.params.uid).then((res) => {
        res.status(200).send(res);
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
