import userModel from '../../../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export default async function Login(req, res) {
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

        let user = {};
        if (username) {
            user = userModel.findOne({
                where: {
                    username: username
                }
            })
        } else {
            user = userModel.findOne({
                where: {
                    email: email
                }
            })
        }


        if (user) {
            /* const passwordCompare = await bcrypt.compare(password, user.password);
            
            if (passwordCompare) { */
            const token = jwt.sign(
                {
                    id: user.id,
                },
                `${process.env.JWT_TOKEN_SECRET}`,
                {
                    expiresIn: "24h",
                }
            );

            user.token = token;
            res.status(200).json(user);

        } else {
            res.status(400).json('Bruger findes ikke');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}