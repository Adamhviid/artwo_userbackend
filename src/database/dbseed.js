import likeSeeder from './seeders/likes.js';
import commentSeeder from './seeders/comments.js';
import postSeeder from './seeders/posts.js';
import userSeeder from './seeders/users.js';

export default function seed() {
    userSeeder();
    postSeeder();
    likeSeeder();
    commentSeeder();
}