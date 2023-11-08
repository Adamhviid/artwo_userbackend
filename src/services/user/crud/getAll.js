import userModel from '../../../models/user.js';

export default async function getAll() {
    try {
        return await userModel.findAll();

    } catch (err) {
        throw err
    }
}