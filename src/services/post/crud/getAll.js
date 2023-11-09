import postModel from "../../../models/post.js";
import likeModel from "../../../models/like.js";

export default async function getAll(req, res) {
    try {
        const posts = await postModel.findAll();
        const likes = await likeModel.findAll();

        res.status(200).json({ posts, likes })

    } catch (err) {
        res.status(500).json(err);
    }
}
