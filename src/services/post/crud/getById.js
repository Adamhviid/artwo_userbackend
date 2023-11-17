import postModel from "../../../models/post.js";
import likeModel from "../../../models/like.js";
import commentModel from "../../../models/comment.js";
import followModel from "../../../models/follow.js";
import userModel from "../../../models/user.js";
import tagModel from "../../../models/tag.js";
import post_tagModel from "../../../models/post_tag.js";

export default async function getById(req, res) {
    try {
        const post = await postModel.findOne({
            where: { id: req.params.id },
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
                    through: {
                        model: post_tagModel,
                        attributes: [],
                    },
                },
            ],
            order: [['updatedAt', 'DESC']],
        });

        const followers = await followModel.findAll();

        res.status(200).json({ post, followers });

    } catch (err) {
        res.status(500).json(err);
    }
}