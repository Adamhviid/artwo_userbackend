import postModel from "../../../models/post.js";

export default async function get(req, res) {
    try {
        const id = req.params.id;

        const post = await postModel.findOne({
            where: {
                id: id,
            },
        });

        if (post) {
            res.status(200).json(post);
        }

    } catch (err) {
        res.status(500).json(err);
    }
}
