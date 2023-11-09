import likeModel from "../../../models/like.js";

export default async function like(req, res) {
    try {
        const { userId, postId } = req.body;

        await likeModel.create({
            userId,
            postId,
        });

        res.status(200).json('Like oprettet');

    } catch (err) {
        res.status(500).json(err);
    }
}