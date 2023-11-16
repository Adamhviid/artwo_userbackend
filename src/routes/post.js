import express from "express";

import deleteById from "../services/post/crud/deleteById.js";
import getAll from "../services/post/crud/getAll.js";
import get from "../services/post/crud/get.js";
import update from "../services/post/crud/update.js";
import create from "../services/post/crud/create.js";
import like from "../services/post/likes/like.js";
import unlike from "../services/post/likes/unlike.js";
import comment from "../services/post/commenting/comment.js";
import uncomment from "../services/post/commenting/uncomment.js";
import getAllTags from "../services/post/tags/getAllTags.js";

import verifyToken from '../middleware/verifyToken.js'

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

router.post("/create", /* verifyToken, */ async (req, res) => {
    create(req, res)
});

router.post("/like/:id", verifyToken, async (req, res) => {
    like(req, res)
});

router.post("/unlike/:id", verifyToken, async (req, res) => {
    unlike(req, res)
});

router.post("/comment/:id", verifyToken, async (req, res) => {
    comment(req, res)
})

router.post("/uncomment/:id", verifyToken, async (req, res) => {
    uncomment(req, res)
})

router.get("/tags/all", async (req, res) => {
    getAllTags(req, res)
})

export default router;
