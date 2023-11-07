import express from "express";
import login from "../../services/user/auth/login.js";
import register from "../../services/user/auth/register.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    login(req)
        .then((result) => {
            res.status(200).json(result);
        }
        ).catch((err) => {
            res.status(500).json(err);
        })
});

router.post("/register", async (req, res) => {
    register(req)
        .then((result) => {
            res.status(200).json(result);
        }
        ).catch((err) => {
            res.status(500).json(err);
        })
});

export default router;