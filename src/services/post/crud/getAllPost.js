import postModel from "../../../models/post.js";

export default async function getAllPost() {
  try {
    return await postModel.findAll();
  } catch (err) {
    throw err;
  }
}
