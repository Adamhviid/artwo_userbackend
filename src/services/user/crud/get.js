import userModel from '../../../models/user.js';

export default async function get(req, res) {
    try {
        const username = req.params.username;

        const user = await userModel.findOne({
            where: {
                username: username
            }
        })

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
}