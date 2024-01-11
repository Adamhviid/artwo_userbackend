import chatModel from '../../models/chat.js';

export default async function getMegaChat(req, res) {
    try {
        const chat = await chatModel.findAll({
            order: [['updatedAt', 'DESC']],
        });

        res.status(200).json(chat);

    } catch (err) {
        res.status(500).json(err);
    }
}