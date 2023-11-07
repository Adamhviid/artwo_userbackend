import post from "../models/post.js";

export default async function findPostById(userId) {
  try {
    const post = await post.find({ userId: userId }).then(async (result) => {
      return result;
    });
    return post;
  } catch (error) {
    return error;
  }
}
