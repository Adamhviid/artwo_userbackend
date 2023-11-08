import postModel from "../../../models/post.js";

export default async function deleteById(id) {
  try {
    return await postModel
      .destroy({
        where: {
          id: id,
        },
      })
      .then(() => {
        return "Post slettet";
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    throw err;
  }
}
