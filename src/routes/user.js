import express from "express";

import getAll from '../services/user/crud/getAll.js'
import get from '../services/user/crud/get.js'
import update from '../services/user/crud/update.js'
import login from "../services/user/auth/login.js";
import register from "../services/user/auth/register.js";
/* import verifyToken from '../../Middleware/verifyToken.js' */

const router = express.Router();

//auth
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

//crud
router.get("/all", /* verifyToken, */ async (req, res) => {
    getAll().then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    })
});

router.get("/get/:id", /* verifyToken, */ async (req, res) => {
    get(req).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    })
});

router.put("/update/:id", /* verifyToken, */ async (req, res) => {
    update(req).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    })
})

export default router;