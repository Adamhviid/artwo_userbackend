import Post from "../../models/post.js";

export default async function GetPost(postId) {
  try {
    await Post.findOne({
      where: {
        id: postId,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    throw err;
  }
}
