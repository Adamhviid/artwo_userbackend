import bcrypt from "bcrypt";
import * as dotenv from 'dotenv'
dotenv.config()

import userModel from '../../models/user.js';

export default async function Register(username, firstname, lastname, email, password) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await userModel.create({
            username: username,
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: hashedPassword,
            isAdmin: false
        })
    
        return "Bruger oprettet"

    } catch (err) {
        if (err.name = "SequelizeUniqueConstraintError") {
            return "Brugernavn eller email er allerede i brug"
        } else {
            return err
        }
    }
}