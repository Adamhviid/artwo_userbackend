import postModel from "../../../models/post.js";
import likeModel from "../../../models/like.js";
import commentModel from "../../../models/comment.js";

export default async function getAll(req, res) {
    try {
        const { page, pageSize } = req.query;
        const offset = (page - 1) * pageSize;
        const postPages = await postModel.count();

        const posts = await postModel.findAll({
            order: [['updatedAt', 'DESC']],
            limit: parseInt(pageSize),
            offset: parseInt(offset),
        });

        // Fetch likes and comments without pagination for simplicity
        const likes = await likeModel.findAll();
        const comments = await commentModel.findAll({
            order: [['updatedAt', 'DESC']],
        });

        res.status(200).json({ posts, postPages, likes, comments });

    } catch (err) {
        res.status(500).json(err);
    }
}