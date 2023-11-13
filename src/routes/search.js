import express from "express";

import searchAll from "../services/search/searchAll.js";

const router = express.Router();

router.get("/all/:keyword", async (req, res) => {
    searchAll(req, res)
});

export default router;