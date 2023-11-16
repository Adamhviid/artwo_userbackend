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
        console.log(newPost.id)
        const tagInstances = await Promise.all(tags.map(async (tag) => {
            const [tagInstance] = await tagModel.findOrCreate({
                where: { tag }
            });
            return tagInstance;
        }));


        const tag_posts = tagInstances.map(tagInstance => {
            return post_tagModel.create({
                postId: newPost.id,
                tagId: tagInstance.id,
            });
        });

        await Promise.all(tag_posts);

        res.status(200).json("Post, tags and jointable created");

    } catch (err) {
        res.status(500).json(err.message);
    }
}