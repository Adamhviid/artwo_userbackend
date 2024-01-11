import tagModel from '../../../models/tag.js';
import post_tagModel from '../../../models/post_tag.js';
import postModel from '../../../models/post.js';

export default async function getAllTags(req, res) {
    try {
        const allPosts = await postModel.findAll({
            where: {
                deletedAt: null
            },
            include: [
                {
                    model: tagModel,
                    through: {
                        model: post_tagModel,
                        attributes: [],
                    },
                },
            ],
        });

        const tagCounts = allPosts.reduce((counts, post) => {
            post.tags.forEach(tag => {
                const foundTag = counts.find(t => t.tag === tag.tag);
                if (foundTag) {
                    foundTag.count++;
                } else {
                    counts.push({ tag: tag.tag, count: 1 });
                }
            });
            return counts;
        }, []);
        
        tagCounts.sort((a, b) => b.count - a.count);
        res.status(200).json(tagCounts);

    } catch (err) {
        res.status(500).json(err);
    }
}