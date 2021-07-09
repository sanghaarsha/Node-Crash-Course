// App will run on http://localhost:6969

const ejs = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();
app.use(
    express.urlencoded({
        extended: true,
    })
);

//  set view engine
app.set("view engine", "ejs");
app.set("views", "EJS-Views");

// Static route middleware
app.use(express.static("./EJS-Views/public"));

// for dotenv
require("dotenv").config();

// PORT Value
const PORT = process.env.PORT || 6969;

// Connecting Mongodb
dbURI = process.env.dbURI;

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(PORT);
    })
    .catch((err) => console.log(err));

// Middlewares for main routes
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
    });
});

// blog routes
app.get("/blogs", (req, res) => {
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

app.get("/blogs/create", (req, res) => {
    res.render("create", {
        title: "Create New Blog",
    });
});

app.post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => console.log(err));
});

// route parameters - :name_of_id
app.get("/blogs/:id", (req, res) => {
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

app.delete("/blogs/:id", (req, res) => {
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
// 404
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found",
    });
});
