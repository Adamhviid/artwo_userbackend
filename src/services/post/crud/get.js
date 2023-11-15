import postModel from "../../../models/post.js";
import likeModel from "../../../models/like.js";
import commentModel from "../../../models/comment.js";
import followModel from "../../../models/follow.js";
import userModel from "../../../models/user.js";

export default async function get(req, res) {
    try {
        const post = await postModel.findOne({
            where: {
                id: req.params.id,
            },
            include: [userModel, commentModel, likeModel],
        });

        res.status(200).json(post);

    } catch (err) {
        res.status(500).json(err);
    }
}