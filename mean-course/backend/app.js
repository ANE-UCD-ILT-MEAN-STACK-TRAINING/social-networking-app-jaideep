const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.get("/api/posts", (req, res, next) => {
    const posts = [{
            id: "fadf12421l",
            title: "First server-side post",
            content: "This is coming from the server",
        },
        {
            id: "ksajflaj132",
            title: "Second server-side post",
            content: "This is coming from the server!",
        },
    ];
    res.status(200).json({
        message: "Posts fetched succesfully!",
        posts: posts,
    });
});

app.post("/api/posts", (req, res, next) => {
    const post = req.body;

    res.status(201).json({
        message: "Post added successfully",
    });
});


module.exports = app;