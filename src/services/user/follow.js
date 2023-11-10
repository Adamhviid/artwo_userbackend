import followModel from "../../models/follow.js";

export default async function follow(req, res) {
    try {
        const { userId, followId } = req.body;

        await followModel.create({
            userId,
            followId,
        });

        res.status(200).json('Follow oprettet');

    } catch (err) {
        res.status(500).json(err);
    }
}