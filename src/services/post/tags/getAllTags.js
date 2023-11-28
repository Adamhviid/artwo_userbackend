import tagModel from '../../../models/tag.js';
import post_tagModel from '../../../models/post_tag.js';

export default async function getAllTags(req, res) {
    try {
        const allTags = await post_tagModel.findAll({
            attributes: ['tagId'],
        });

        const tagCounts = allTags.reduce((counts, tag) => {
            if (!counts[tag.tagId]) {
                counts[tag.tagId] = 0;
            }
            counts[tag.tagId]++;
            return counts;
        }, {});

        const result = await Promise.all(Object.entries(tagCounts).map(async ([tagId, count]) => {
            const tag = await tagModel.findByPk(tagId);
            return { tag: tag.tag, count };
        }));

        result.sort((a, b) => b.count - a.count);

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json(err);
    }
}