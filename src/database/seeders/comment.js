import Comment from '../../models/comment.js';

Comment
    .sync()
    .then(() => {
        console.log("Comment table created");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });
