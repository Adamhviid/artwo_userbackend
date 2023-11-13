import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import user from "./src/routes/user.js";
import post from "./src/routes/post.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", user);
app.use("/post", post);

app.get("/bruh", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}...`);
});
