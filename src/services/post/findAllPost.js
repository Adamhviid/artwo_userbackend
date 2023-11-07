import post from "../models/post.js";

export default async function findAllPost(authorization) {
  try {
    let posts = [];
    if (authorization === "user") {
      await post.find({ sold: false }).then(async (result) => {
        posts = result;
      });
    } else if (authorization === "admin") {
      await post.find().then(async (result) => {
        posts = result;
      });
    }
    return posts;
  } catch (error) {
    return error;
  }
}
