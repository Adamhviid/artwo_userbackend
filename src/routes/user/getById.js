import express from "express";
import * as dotenv from 'dotenv'
dotenv.config()

import GetUser from '../../Services/GetUser.js'
/* import verifyToken from '../../Middleware/verifyToken.js' */

const router = express.Router();

router.get("/user/:id", /* verifyToken, */ async (res) => {
    const id = req.params.id;

    GetUser(user.email).then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        res.status(500).json(err);
    })
});

export default router;