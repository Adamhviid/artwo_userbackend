import postModel from "../../../models/post.js";

export default async function deleteById(req, res) {
    try {
        const id = req.params.id;

        return await postModel
            .destroy({
                where: {
                    id: id,
                },
            })
            .then(() => {
                return res.status(200).json("Post deleted successfully");
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    } catch (err) {
        return res.status(500).json(err);
    }
}
