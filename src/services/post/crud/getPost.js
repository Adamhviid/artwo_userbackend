import postModel from "../../../models/post.js";

export default async function get(id) {
  try {
    return await postModel.findOne({
      where: {
        id: id,
      },
    });
  } catch (err) {
    throw err;
  }
}
