import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import findPostById from "./src/routes/post/findPostById.js";
import findAllPost from "./src/routes/psot/findAllPost.js";

import login from "./src/routes/user/login.js";
import register from "./src/routes/user/register.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", login);
app.use("/auth", register);
app.use("/post", findPostById);
app.use("/post", findAllPost);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}...`);
});
