import Like from '../../models/like.js';

export default Like
    .sync()
    .then(() => {
        console.log("like table created");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });