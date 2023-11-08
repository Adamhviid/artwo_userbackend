import bcrypt from "bcrypt";

import userModel from '../../../models/user.js';

export default async function Register(req) {
    try {
        const { username, firstName, lastName, email, password } = req.body;

        if (!username || !email || !firstName || !lastName || !password) {
            res.status(400).json("indtast venligst alle felter");
            return;
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await userModel.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
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