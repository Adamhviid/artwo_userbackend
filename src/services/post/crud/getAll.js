import postModel from "../../../models/post.js";
import likeModel from "../../../models/like.js";
import commentModel from "../../../models/comment.js";
import followModel from "../../../models/follow.js";
import userModel from "../../../models/user.js";

export default async function getAll(req, res) {
    try {
        const { page, pageSize } = req.query;
        const offset = (page - 1) * pageSize;
        const postPages = await postModel.count();

        const posts = await postModel.findAll({
            include: [userModel],
            order: [['updatedAt', 'DESC']],
            limit: parseInt(pageSize),
            offset: parseInt(offset),
        });

        const comments = await commentModel.findAll({
            include: [userModel],
            order: [['updatedAt', 'DESC']],
        });
        const likes = await likeModel.findAll();
        const followers = await followModel.findAll();

        res.status(200).json({ posts, postPages, likes, comments, followers });

    } catch (err) {
        res.status(500).json(err);
    }
}