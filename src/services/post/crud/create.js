import postModel from "../../../models/post.js";

export default async function create(req, res) {
    try {
        const { title, content, tags, userId } = req.body;

        await postModel.create({
            title,
            content,
            tags,
            userId,
        });

        res.status(200).json("Post oprettet");
    } catch (err) {
        res.status(500).json(err);
    }
}
