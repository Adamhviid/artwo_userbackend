import postModel from "../../../models/post.js";

export default async function getAll(res, req) {
    try {
        const posts = await postModel.findAll();
        
        res.status(200).json(posts);

    } catch (err) {
        return res.status(500).json(err);
    }
}
