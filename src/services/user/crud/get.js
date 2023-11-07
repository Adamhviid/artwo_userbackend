import userModel from '../../../models/user.js';

export default async function get(id) {
    try {
        return await userModel.findOne({
            where: {
                id: id
            }
        })

    } catch (err) {
        throw err
    }
}