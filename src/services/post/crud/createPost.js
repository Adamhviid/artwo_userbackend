import postModel from "../../../models/post.js";

export default async function createPost(req) {
  try {
    const { title, content, tags, userId } = req.body;

    // Create a new post object
    const newPost = {
      title,
      content,
      tags,
      userId,
    };

    // Create the post in the database
    await postModel.create(newPost);

    return "Post created successfully";
  } catch (err) {
    throw err;
  }
}
