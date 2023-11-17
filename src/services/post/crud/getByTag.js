import postModel from "../../../models/post.js";
import likeModel from "../../../models/like.js";
import commentModel from "../../../models/comment.js";
import followModel from "../../../models/follow.js";
import userModel from "../../../models/user.js";
import tagModel from "../../../models/tag.js";
import post_tagModel from "../../../models/post_tag.js";

export default async function getByTag(req, res) {
    try {
        const posts = await postModel.findAll({
            include: [
                userModel,
                {
                    model: likeModel,
                    required: false,
                },
                {
                    model: commentModel,
                    required: false,
                    include: [
                        {
                            model: userModel,
                            required: false,
                        },
                    ],
                    order: [['updatedAt', 'DESC']],
                },
                {
                    model: tagModel,
                    where: { tag: req.params.tag },
                    through: {
                        model: post_tagModel,
                        attributes: [],
                    },
                },
            ],
            order: [['updatedAt', 'DESC']],
        });

        const followers = await followModel.findAll();

        res.status(200).json({ posts, followers });

    } catch (err) {
        res.status(500).json(err);
    }
}