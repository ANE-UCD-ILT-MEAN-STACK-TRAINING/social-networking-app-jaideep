const express = require('express');
const Post = require('../models/post');
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
    .connect(
        "mongodb://localhost:27017/MyPosts?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }))

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
});

router.get("/api/posts", (req, res, next) => {
    Post.find().then((documents) => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents,
        });
    });
});


router.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    console.log(post);
    post.save().then(createdPost => {
        res.status(201).json({
            message: "Post added successfully",
            postId: createdPost._id
        });
    });
});

router.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
    });
});


router.put('/api/posts/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });

    Post.updateOne({ _id: req.params.id }, post)
        .then(updatedPost => {
            res.status(201).json({
                message: 'Post Added !!',
                postId: updatedPost._id
            });
        });
});

router.get('/api/posts/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: 'post not found'
                });
            }

        });
});


module.exports = router;