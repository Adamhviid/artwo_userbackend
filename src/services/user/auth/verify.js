import userModel from "../../../models/user.js";

export default async function verify(req, res) {
    try {
        const user = await userModel.findOne({
            where: {
                id: req.user.id
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}