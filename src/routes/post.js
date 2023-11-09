import express from "express";
import deleteById from "../services/post/crud/deleteById.js";
import getAll from "../services/post/crud/getAll.js";
import get from "../services/post/crud/get.js";
import update from "../services/post/crud/update.js";
import create from "../services/post/crud/create.js";

import verifyToken from '../middleware/VerifyToken.js'

const router = express.Router();

router.get("/all", async (req, res) => {
    getAll(req, res)
});

router.get("/get/:id", async (req, res) => {
    get(req, res)
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
    deleteById(req, res)
});

router.put("/update/:id", verifyToken, async (req, res) => {
    update(req, res)
});

router.post("/create", verifyToken, async (req, res) => {
    create(req, res)
});

export default router;
