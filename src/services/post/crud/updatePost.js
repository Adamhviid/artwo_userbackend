import postModel from "../../../models/post.js";

export default async function updatePost(id, req) {
  try {
    const { title, content, tags } = req.body;

    // Find the post to be updated
    const post = await postModel.findOne({
      where: {
        id: id,
      },
    });

    // Update the post's information
    if (post) {
      await postModel.update(
        {
          title: title,
          content: content,
          tags: tags,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return "Post updated successfully";
    } else {
      throw new Error("Post not found");
    }
  } catch (err) {
    throw err;
  }
}
