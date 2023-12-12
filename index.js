import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

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
