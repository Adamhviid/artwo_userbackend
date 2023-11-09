import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

const like = connection.define("like", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
});

like
    .sync()
    .then(() => {
        console.log("like table created");
    })
    .catch((error) => {
        console.error("Unable to create table : ", error);
    });

export default like;