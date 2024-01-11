import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { WebSocketServer } from 'ws';
import http from 'http';
import { v4 as uuidv4 } from 'uuid';

import user from "./src/routes/user.js";
import post from "./src/routes/post.js";
import search from "./src/routes/search.js";

import { consumePosts, consumePostDeletion } from './src/services/rabbitmq/posts.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", user);
app.use("/post", post);
app.use("/search", search);

app.get("/bruh", (req, res) => {
    res.send("Hello World!");
});

//rabbitmq consumers
consumePosts();
consumePostDeletion();

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}...`);
});

import chat from './src/models/chat.js';

const server = http.createServer();
const ws = new WebSocketServer({ server });

const port = 8000;
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

const clients = {};

ws.on('connection', function (connection) {
    connection.on('message', async (message) => {
        const data = JSON.parse(message);
        const userId = data.userId;
        clients[userId] = connection;
        console.log(`${userId} connected. Total clients: ${Object.keys(clients).length}`);
        
        try {
            const message = await chat.create({
                userId: data.userId,
                username: data.username,
                content: data.message,
            });
            ws.clients.forEach((client) => {
                client.send(`[${message.createdAt}] ${data.username}: ${data.message}`);
            });
        } catch (error) {
            console.error('Failed to save chat message:', error);
        }
    });
});