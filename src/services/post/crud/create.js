import postModel from "../../../models/post.js";
import tagModel from "../../../models/tag.js";
import post_tagModel from "../../../models/post_tag.js";

export default async function create(req, res) {
    try {
        const { title, content, tags, userId } = req.body;

        const newPost = await postModel.create({
            title,
            content,
            userId,
        })

        const tagInstances = await Promise.all(tags.map(async (tag) => {
            const [tagInstance] = await tagModel.findOrCreate({
                where: { tag }
            });
            return tagInstance;
        }));

        const tag_posts = tagInstances.map(tagInstance => ({
            postId: newPost.id,
            tagId: tagInstance.id,
        }));

        await post_tagModel.bulkCreate(tag_posts);

        res.status(200).json("Post, tags and jointable created");
    } catch (err) {
        console.error(err);
        res.status(500).json(err.message);
    }
}