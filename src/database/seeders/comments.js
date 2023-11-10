import Comment from '../../models/comment.js';

export default Comment
    .sync()
    .then(() => {
        console.log("Comment table created");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
