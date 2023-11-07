import express from "express";
import register from "../../services/user/register.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, firstname, lastname, email, password } = req.body;

        if (!username || !email || !firstname || !lastname || !password) {
            res.status(400).json("indtast venligst alle felter");
            return;
        }

        register(username, firstname, lastname, email, password)
            .then((result) => {
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