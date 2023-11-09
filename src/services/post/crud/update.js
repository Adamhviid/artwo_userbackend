import postModel from "../../../models/post.js";

export default async function update(req, res) {
    try {
        const { title, content, tags } = req.body;
        const id = req.params.id;

        const post = await postModel.findOne({
            where: {
                id: id,
            },
        });

        if (post) {
            await postModel.update(
                {
                    title: title,
                    content: content,
                    tags: tags,
                },
                {
                    where: {
                        id: id,
                    },
                }
            );
            res.status(200).json("Post blev opdateret");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
