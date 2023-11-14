import Post from "../models/post.js";
import Comment from '../models/comment.js';
import Like from '../models/like.js';
import User from '../models/user.js';
import Follow from '../models/follow.js';
import Tag from '../models/tag.js';

import Connection from './connection.js';

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
        userId: 1,
    },
    {
        title: "My second post",
        content: "This is the content of my second post.",
        userId: 2,
    },
    {
        title: "My third post",
        content: "This is the content of my third post.",
        userId: 1,
    },
    {
        title: "My fourth post",
        content: "This is the content of my fourth post.",
        userId: 2,
    },
    {
        title: "My fifth post",
        content: "This is the content of my fifth post.",
        userId: 1,
    },
];

const testTags = [
    {
        tag: "tag1",
    },
    {
        tag: "tag2",
    },
    {
        tag: "tag3",
    },
    {
        tag: "tag4",
    },
    {
        tag: "tag5",
    },
];

async function dbSeed() {
    console.log("Seeding database...");
    try {
        Post.belongsToMany(Tag, { through: 'post_tags' });
        Post.hasMany(Like);
        Post.hasMany(Comment);
        Post.belongsTo(User);

        Tag.belongsToMany(Post, { through: 'post_tags' });

        Like.belongsTo(Post);
        Like.belongsTo(User);

        User.hasMany(Like);
        User.hasMany(Comment);
        User.hasMany(Follow, { as: 'follower' });
        User.hasMany(Follow, { as: 'following' });
        User.hasMany(Post);

        Follow.belongsTo(User, { as: 'follower' });
        Follow.belongsTo(User, { as: 'following' });

        Comment.belongsTo(Post);
        Comment.belongsTo(User);

        await Connection.sync();

        for (const user of testUsers) {
            await User.create(user);
        }

        for (const post of testPosts) {
            await Post.create(post);
        }

        for (const tag of testTags) {
            await Tag.create(tag);
        }

    } catch (err) {
        console.error(err);
    }
};

dbSeed()