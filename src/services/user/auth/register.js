import bcrypt from "bcrypt";

import userModel from '../../../models/user.js';

export default async function register(req, res) {
    try {
        const { username, firstName, lastName, email, dateOfBirth, password } = req.body;

        if (!username || !email || !firstName || !lastName || !dateOfBirth || !password) {
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
            dateOfBirth: dateOfBirth,
            password: hashedPassword,
            isAdmin: false
        })

        res.status(200).json('Bruger oprettet');

    } catch (err) {
        if (err.name = "SequelizeUniqueConstraintError") {
            res.status(400).json("Brugernavn eller email er allerede i brug");
        } else {
            res.status(500).json(err);
        }
    }
}