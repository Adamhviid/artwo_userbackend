import express from "express";
import getAll from "../../services/user/crud/getAll.js";
import get from "../../services/user/crud/get.js";
import deleteById from "../../services/user/crud/delete.js";
import update from "../../services/user/crud/update.js";

/* import verifyToken from '../../Middleware/verifyToken.js' */

const router = express.Router();

router.get("/all", async (req, res) => {
  getAll()
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

    get(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

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

router.post("/update/:id", async (req, res) => {
  const id = req.params.id;

  update(id, req)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default router;
