import express from "express";

import getAll from '../services/user/crud/getAll.js'
import get from '../services/user/crud/get.js'
import update from '../services/user/crud/update.js'
import login from "../services/user/auth/login.js";
import register from "../services/user/auth/register.js";
import follow from "../services/user/follow.js";

import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

//auth
router.post("/login", async (req, res) => {
    login(req, res)
});

router.post("/register", async (req, res) => {
    register(req, res)
});

//crud
router.get("/all", async (req, res) => {
    getAll(req, res)
});

router.get("/get/:username", async (req, res) => {
    get(req, res)
});

router.put("/update/:id", verifyToken, async (req, res) => {
    update(req, res)
})

router.post("/follow/:id", verifyToken, async (req, res) => {
    follow(req, res)
})

export default router;