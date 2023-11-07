import express from "express";
import login from "../../services/user/login.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username && !email) {
            res.status(400).json("Email or username is required");
            return;
        }

        if (!password) {
            res.status(400).json("Password is required");
            return;
        }

        login(username, email, password)
            .then((result) => {
                console.log(result);
                res.status(200).json(result);
            }
            ).catch((err) => {
                res.status(500).json(err);
            })

    } catch (err) {
        res.status(500).json(err);
    }

});
export default router;