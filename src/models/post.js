import { DataTypes } from "sequelize";
import connection from "../database/connection.js";

const post = connection.define("posts", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

post
  .sync()
  .then(() => {
    console.log("posts table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

export default post;
