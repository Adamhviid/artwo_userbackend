import bcrypt from "bcrypt";

import userModel from '../../../models/user.js';

export default async function update(req, res) {
    try {
        const { username, firstName, lastName, email, password } = req.body;
        const id = req.params.id;

        const user = await userModel.findOne({
            where: {
                id: id
            }
        })

        let hashedPassword = user.password;
        if (password != user.password) {
            const salt = await bcrypt.genSalt();
            hashedPassword = await bcrypt.hash(password, salt);
        }

        await user.update({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
        }, {
            where: {
                id: id
            }
        });

        res.status(200).json('Bruger opdateret');

    } catch (err) {
        if (err.name = "SequelizeUniqueConstraintError") {
            res.status(400).json("Brugernavn eller email er allerede i brug");
        } else {
            res.status(500).json(err);
        }
    }
}

