import commentModel from "../../../models/comment.js";

export default async function comment(req, res) {
    try {
        const { userId, postId, content } = req.body;

        const comment = await commentModel.create({
            userId,
            postId,
            content,
        });

        res.status(200).json(comment);

    } catch (err) {
        res.status(500).json(err);
    }
}