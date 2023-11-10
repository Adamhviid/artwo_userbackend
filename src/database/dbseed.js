import Post from "../models/post.js";
import Comment from '../models/comment.js';
import Like from '../models/like.js';
import User from '../models/user.js';
import Follow from '../models/follow.js';

const testUsers = [
    {
        id: 1,
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        dateOfBirth: '1990-01-01',
        password: '$2b$10$ipw.8tiGNKCdWdAV0DtWI.LKKQqKOQ0rIIxI15OLONzufyb7bP2lC', //123
        isAdmin: '0'
    },
    {
        id: 2,
        username: 'janedoe',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@example.com',
        dateOfBirth: '1990-01-01',
        password: '$2b$10$ipw.8tiGNKCdWdAV0DtWI.LKKQqKOQ0rIIxI15OLONzufyb7bP2lC', //123
        isAdmin: '1'
    }
];

const testPosts = [
    {
        title: "My first post",
        content: "This is the content of my first post.",
        tags: "post,tag,example",
        userId: 1,
    },
    {
        title: "My second post",
        content: "This is the content of my second post.",
        tags: "post,tag,example",
        userId: 2,
    },
    {
        title: "My third post",
        content: "This is the content of my third post.",
        tags: "post,tag,example",
        userId: 1,
    },
    {
        title: "My fourth post",
        content: "This is the content of my fourth post.",
        tags: "post,tag,example",
        userId: 2,
    },
    {
        title: "My fifth post",
        content: "This is the content of my fifth post.",
        tags: "post,tag,example",
        userId: 1,
    },
];

async function dbSeed() {
    console.log("Seeding database...");
    try {
        await User.sync();

        for (const user of testUsers) {
            await User.create(user);
        }

        await Post.sync();

        for (const post of testPosts) {
            await Post.create(post);
        }

        await Comment.sync();

        await Like.sync();

        await Follow.sync();

    } catch (err) {
        console.error(err);
    }
};

dbSeed()