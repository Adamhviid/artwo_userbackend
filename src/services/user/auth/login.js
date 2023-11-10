import userModel from '../../../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export default async function login(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username && !email) {
            res.status(400).json("Email eller brugernavn er påkrævet");
            return;
        }

        if (!password) {
            res.status(400).json("Password er påkrævet");
            return;
        }

        let user = null;
        if (username) {
            user = await userModel.findOne({
                where: {
                    username: username
                }
            });
        } else {
            user = await userModel.findOne({
                where: {
                    email: email
                }
            });
        }

        if (user != null) {
            const passwordCompare = await bcrypt.compare(password, user.password);

            if (passwordCompare) {
                const token = jwt.sign(
                    {
                        id: user.id,
                    },
                    `${process.env.JWT_TOKEN_SECRET}`,
                    {
                        expiresIn: "24h",
                    }
                );

                user.dataValues.token = token;
                res.status(200).json(user.dataValues);

            } else {
                res.status(400).json('Forkert password');
            }

        } else {
            res.status(400).json('Bruger findes ikke');
        }

    } catch (err) {
        res.status(500).json(err);
    }
}