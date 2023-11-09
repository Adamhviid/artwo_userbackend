import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth from "./src/routes/user/auth.js";
import crud from "./src/routes/user/crud.js";
import crudPost from "./src/routes/post/crudPost.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/user", crud);
app.use("/post", crudPost);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT || 8080}...`);
});
