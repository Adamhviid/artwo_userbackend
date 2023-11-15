import commentModel from "../../../models/comment.js";

export default async function uncomment(req, res) {
    try {
        const { commentId } = req.body;

        await commentModel.update(
            { deletedAt: new Date() },
            { where: { id: commentId } }
        );

        res.status(200).json('Comment deleted');

    } catch (err) {
        res.status(500).json(err);
    }
}