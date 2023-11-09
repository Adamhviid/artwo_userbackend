import postModel from "../../../models/post.js";

export default async function getAll(req, res) {
    try {
        const posts = await postModel.findAll();

        res.status(200).json(posts)

    } catch (err) {
        res.status(500).json(err);
    }
}
