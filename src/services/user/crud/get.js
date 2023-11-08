import userModel from '../../../models/user.js';

export default async function get(req) {
    try {
        const id = req.params.id;

        return await userModel.findOne({
            where: {
                id: id
            }
        })

    } catch (err) {
        throw err
    }
}