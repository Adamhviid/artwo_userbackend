import Post from "../../models/post.js";
import db_connection from "../../db_connection.js";

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

const seedPosts = async () => {
  try {
    console.log("Seeding posts...");
    for (const post of testPosts) {
      await Post.create(post);
    }
  } catch (err) {
    console.error(err);
  }
};

seedPosts();
