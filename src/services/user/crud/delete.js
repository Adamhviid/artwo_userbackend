import userModel from '../../../models/user.js';

export default async function deleteById(id) {
    try {
        return await userModel.destroy({
            where: {
                id: id
            }
        }).then(() => {
            return "Bruger slettet"
        }).catch((err) => {
            return err
        })


    } catch (err) {
        throw err
    }
}