import likeModel from "../../models/like.js";

export default async function unlike(req, res) {
    try {
        const { userId, postId } = req.body;

        await likeModel.destroy({
            where: {
                userId,
                postId,
            },
        });

        res.status(200).json('Like fjernet');

    } catch (err) {
        res.status(500).json(err);
    }
}