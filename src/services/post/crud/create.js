import postModel from "../../../models/post.js";
import tagModel from "../../../models/tag.js";
import post_tagModel from "../../../models/post_tag.js";
import azureStorage from "azure-storage";

const storageAccount = process.env.AZURE_STORAGE_ACCOUNT;
const accessKey = process.env.AZURE_STORAGE_ACCESSKEY
const containerName = process.env.AZURE_STORAGE_CONTAINERNAME
const blobService = azureStorage.createBlobService(storageAccount, accessKey);

export default async function create(req, res) {
    try {
        const { title, content, userId } = req.body;
        const tags = JSON.parse(req.body.tags);
        let blobURL = null;
        
        if (req.file) {
            const blobName = req.file.originalname;
            const stream = new Buffer.from(req.file.buffer);

            blobURL = await new Promise((resolve, reject) => {
                blobService.createBlockBlobFromText(containerName, blobName, stream, stream.length, (error, result, response) => {
                    if (error) {
                        console.error(error);
                        reject('Error uploading image to Azure Blob Storage');
                    }

                    resolve(blobService.getUrl(containerName, blobName));
                });
            });
        }

        const newPost = await postModel.create({
            title,
            content,
            userId,
            image: blobURL,
        });

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

        res.status(200).json("Post, tags, and jointable created");

    } catch (err) {
        res.status(500).json(err.message);
    }
}