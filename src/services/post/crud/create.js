import postModel from "../../../models/post.js";
import amqp from 'amqplib/callback_api';
import tagModel from "../../../models/tag.js";
import post_tagModel from "../../../models/post_tag.js";
/* import azureStorage from "azure-storage";

const storageAccount = process.env.AZURE_STORAGE_ACCOUNT;
const accessKey = process.env.AZURE_STORAGE_ACCESSKEY
const containerName = process.env.AZURE_STORAGE_CONTAINERNAME
const blobService = azureStorage.createBlobService(storageAccount, accessKey); */

const connectionString = process.env.RABBITMQ_CONNECTION_STRING;

console.log("inside create.js");
amqp.connect(connectionString, (err, connection) => {
    console.log("connected to rabbitmq");
    if (err) {
        throw err;
    }

    connection.createChannel(async (err, channel) => {
        if (err) {
            throw err;
        }

        const queueName = 'posts';

        channel.assertQueue(queueName, {
            durable: false
        });

        console.log(`Waiting for messages in ${queueName}`);

        channel.consume(queueName, async (msg) => {
            const data = JSON.parse(msg.content.toString());

            const newPost = await postModel.create({
                title: data.title,
                content: data.content,
                userId: data.userId,
                imageUrl: data.imageUrl,
            });
            const tagInstances = await Promise.all(data.tags.map(async (tag) => {
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

            console.log("Post, tags, and jointable created");
            channel.ack(msg);
        });
    });
});