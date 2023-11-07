import userModel from '../../../models/user.js';

export default async function update(id, req) {
    try {
        const { username, firstname, lastname, email, password } = req.body;

        const user = await userModel.findOne({
            where: {
                id: id
            }
        })

        // Check if the password was changed
        if (password != user.password) {
            // Hash the new password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            // Update the user's password
            await userModel.update({
                password: hashedPassword
            }, {
                where: {
                    id: id
                }
            })
        }

        // Update the user's other information
        await userModel.update({
            username: username,
            firstName: firstname,
            lastName: lastname,
            email: email,
            isAdmin: false
        }, {
            where: {
                id: id
            }
        })

        return "Bruger opdateret"

    } catch (err) {
        throw err

    }
}

