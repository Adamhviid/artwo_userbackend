import userModel from '../../../models/user.js';

export default async function get(req, res) {
    try {
        const id = req.params.id;

        const user = await userModel.findOne({
            where: {
                id: id
            }
        })

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
}