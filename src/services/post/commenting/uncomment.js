import commentModel from "../../../models/comment.js";

export default async function uncomment(req, res) {
    try {
        const { userId, postId } = req.body;

        await commentModel.update(
            { deletedAt: new Date() },
            { where: { userId, postId } }
        );

        res.status(200).json('Comment deleted');

    } catch (err) {
        res.status(500).json(err);
    }
}