import post from "../models/post.js";
import comment from '../models/comment.js';
import like from '../models/like.js';
import user from '../models/user.js';
import follow from '../models/follow.js';
import tag from '../models/tag.js';
import post_tag from '../models/post_tag.js';

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
        image: null
    },
    {
        title: "My second post",
        content: "This is the content of my second post.",
        userId: 2,
        image: ""
    },
    {
        title: "My third post",
        content: "This is the content of my third post.",
        userId: 1,
        image: null
    },
    {
        title: "My fourth post",
        content: "This is the content of my fourth post.",
        userId: 2,
        image: null
    },
    {
        title: "My fifth post",
        content: "This is the content of my fifth post.",
        userId: 1,
        image: null
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
        user.hasMany(like, { onDelete: 'cascade' });
        user.hasMany(comment, { onDelete: 'cascade' });
        user.hasMany(follow, { as: 'follower' });
        user.hasMany(follow, { as: 'following' });
        user.hasMany(post, { onDelete: 'cascade' });

        post.belongsToMany(tag, { through: post_tag, foreignKey: 'postId' });
        post.belongsTo(user, { foreignKey: 'userId' });
        post.hasMany(comment, { foreignKey: 'postId' });
        post.hasMany(like, { foreignKey: 'postId' });

        tag.belongsToMany(post, { through: post_tag, foreignKey: 'tagId' });

        like.belongsTo(post, { foreignKey: 'postId' });
        like.belongsTo(user, { foreignKey: 'userId' });

        follow.belongsTo(user, { as: 'follower' });
        follow.belongsTo(user, { as: 'following' });
        follow.belongsTo(user, { foreignKey: 'userId' });
        follow.belongsTo(user, { foreignKey: 'followId', as: 'followedUser' });

        comment.belongsTo(post, { foreignKey: 'postId' });
        comment.belongsTo(user, { foreignKey: 'userId' });


        await Connection.sync();

        for (const testUser of testUsers) {
            await user.create(testUser);
        }

        for (const testPost of testPosts) {
            await post.create(testPost);
        }

        for (const testTag of testTags) {
            await tag.create(testTag);
        }

    } catch (err) {
        console.error(err);
    }
};

dbSeed()