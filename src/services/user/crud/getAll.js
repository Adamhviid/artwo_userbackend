import userModel from '../../../models/user.js';

export default async function getAll(req, res) {
    try {
        const users = await userModel.findAll();

        res.status(200).json(users);

    } catch (err) {
        res.status(500).json(err);
    }
}