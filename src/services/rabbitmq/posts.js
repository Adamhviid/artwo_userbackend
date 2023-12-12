import { connect } from 'amqplib';
import azureStorage from "azure-storage";
import { v4 as uuidv4 } from 'uuid';
import * as dotenv from "dotenv";
dotenv.config();

import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import postModel from "../../models/post.js";
import tagModel from "../../models/tag.js";
import post_tagModel from "../../models/post_tag.js";

const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);
const __dirname = dirname(fileURLToPath(import.meta.url));

const storageAccount = process.env.AZURE_STORAGE_ACCOUNT;
const accessKey = process.env.AZURE_STORAGE_ACCESSKEY
const containerName = process.env.AZURE_STORAGE_CONTAINERNAME
const blobService = azureStorage.createBlobService(storageAccount, accessKey);

const rabbitMQServerURL = `${process.env.RABBITMQ_SERVER_URL}`;

const consumePosts = async () => {
    try {
        const connection = await connect(rabbitMQServerURL);
        const channel = await connection.createChannel();
        console.log("Connected to RabbitMQ server");

        const queue = 'posts';
        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (msg) => {
            const data = JSON.parse(msg.content.toString());

            let newImageUrl = null;
            if (data.tempImageUrl) {
                const blobName = path.basename(data.tempImageUrl);
                const tempFilePath = path.join(__dirname, blobName);

                newImageUrl = await new Promise((resolve, reject) => {
                    blobService.getBlobToLocalFile('posts-queue', blobName, tempFilePath, async () => {
                        const blobContent = await readFileAsync(tempFilePath);
                        const newBlobName = uuidv4() + path.extname(blobName);

                        blobService.createBlockBlobFromText(containerName, newBlobName, blobContent, () => {
                            blobService.deleteBlob('posts-queue', blobName, async () => {
                                await unlinkAsync(tempFilePath);
                                resolve(`https://${storageAccount}.blob.core.windows.net/${containerName}/${newBlobName}`);
                            });
                        });
                    });
                });
            }

            const newPost = await postModel.create({
                title: data.title,
                content: data.content,
                userId: data.userId,
                image: newImageUrl,
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
    } catch (error) {
        console.error(error);
    }
};

const consumePostDeletion = async () => {
    try {
        const connection = await connect(rabbitMQServerURL);
        const channel = await connection.createChannel();
        console.log("Connected to RabbitMQ server");

        const queue = 'posts-deletion';
        await channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (msg) => {
            const message = JSON.parse(msg.content.toString());
            const id = message.id;
            await postModel.update({ deletedAt: new Date() }, { where: { id } });

            channel.ack(msg);
        });


    } catch (error) {
        console.log(error);
    }
}

export { consumePosts, consumePostDeletion };