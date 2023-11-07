import User from '../../models/user.js';

export default async function GetUser(userEmail) {
    try {
        await User.findOne({
            where: {
                email: userEmail
            }
        }).then(res => {
            return res;
        }
        ).catch(err => {
            return err;
        })
    } catch (err) {
        throw err
    }
}