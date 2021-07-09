const express = require("express");
const Blog = require("../models/blog");
const router = express.Router();

// blog routes
router.get("/", (req, res) => {
    Blog.find()
        .sort({
            createdAt: -1,
        })
        .then((result) => {
            res.render("index", {
                title: "All Blogs",
                blogs: result,
            });
        })
        .catch((err) => console.log(err));
});

router.get("/create", (req, res) => {
    res.render("create", {
        title: "Create New Blog",
    });
});

router.post("/", (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => console.log(err));
});

// route parameters - :name_of_id
router.get("/:id", (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
        .then((result) => {
            res.render("details", {
                title: "Blog Details",
                blog: result,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id; // id of blog to be deleted

    Blog.findByIdAndDelete(id)
        .then((result) => {
            // this is AJAX req made using fetch api from details view
            // so we can't redirect to blog route from node.js
            // we need to send a json respose with redirect endpoint
            // to 'details.ejs' view and redirect user from there
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => console.log(err));
});

module.exports = router;
