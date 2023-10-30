const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

app.use(cors());

app.get("/blogs", (req, res) => {
    res.json("hello from backend");
})

app.listen(port, () => {
    console.log(`app listening on ${port}`);
})