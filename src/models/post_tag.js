import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

const post_tag = connection.define("post_tags", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
})

export default post_tag;