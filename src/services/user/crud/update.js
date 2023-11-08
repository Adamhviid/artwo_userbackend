import userModel from '../../../models/user.js';

export default async function update(id, req) {
    try {
        const { username, firstname, lastname, email, password } = req.body;

        await userModel.findOne({
            where: {
                id: id
            }
        }).then(async user => {
            // Check if the password was changed
            let hashedPassword = user.password;
            if (password != user.password) {
                // Hash the new password
                const salt = await bcrypt.genSalt();
                hashedPassword = await bcrypt.hash(password, salt);
            }

            // Update the user's information
            await userModel.update({
                username,
                firstName: firstname,
                lastName: lastname,
                email,
                password: hashedPassword,
                isAdmin: false
            }, {
                where: {
                    id: id
                }
            });

            return 'User updated successfully';
        });
    } catch (err) {
        throw err;
    }
}

