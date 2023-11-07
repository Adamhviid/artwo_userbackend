import userModel from '../../models/user.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'
dotenv.config()

export default async function Login(username, email, password) {
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
        return user

        /*  } else {
             return "Invalid Credentials";
         } */
    } else {
        return "Invalid Credentials";
    }

}