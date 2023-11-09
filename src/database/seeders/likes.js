import Like from '../../models/like.js';

const testLikes = [
    {
        userId: 1,
        postId: 2,
    },
    {
        userId: 1,
        postId: 3,
    },
    {
        userId: 2,
        postId: 1,
    },
    {
        userId: 2,
        postId: 4,
    },
    {
        userId: 2,
        postId: 5,
    },
];

const seedLikes = async () => {
    try {
        console.log('Seeding likes...');
        for (const like of testLikes) {
            await Like.create(like);
        }
    } catch (err) {
        console.error(err);
    }
}

seedLikes();