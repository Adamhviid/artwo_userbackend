import { Op } from "sequelize";

import userModel from "../../models/user.js";
import postModel from "../../models/post.js";
import commentModel from "../../models/comment.js";

export default async function searchAll(req, res) {
    const keyword = req.params.keyword;

    try {
        const userResults = await userModel.findAll({
            where: {
                [Op.or]: [
                    { username: { [Op.like]: '%' + keyword + '%' } },
                    { firstName: { [Op.like]: '%' + keyword + '%' } },
                    { lastName: { [Op.like]: '%' + keyword + '%' } },
                    { email: { [Op.like]: '%' + keyword + '%' } }
                ]
            }
        });

        const postResults = await postModel.findAll({
            where: [
                { title: { [Op.like]: '%' + keyword + '%' } },
                { content: { [Op.like]: '%' + keyword + '%' } }
            ]
        });

        const commentResults = await commentModel.findAll({
            where: {
                content: { [Op.like]: '%' + keyword + '%' }
            }
        });

        res.status(200).json({
            users: userResults,
            posts: postResults,
            comments: commentResults
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
