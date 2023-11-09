import postModel from "../../../models/post.js";
import likeModel from "../../../models/like.js";
import commentModel from "../../../models/comment.js"

export default async function getAll(req, res) {
    try {
        const posts = await postModel.findAll();
        const likes = await likeModel.findAll();
        const comments = await commentModel.findAll();

        res.status(200).json({ posts, likes, comments })

    } catch (err) {
        res.status(500).json(err);
    }
}
