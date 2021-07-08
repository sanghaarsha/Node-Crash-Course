// App will run on http://localhost:6969

const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

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
        // Listening on a port only when database is connected
        app.listen(PORT);
    })
    .catch((err) => console.log(err));

// blog sample
const blogs = [
    {
        title: "This is my first blog",
        snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
        title: "NodeJS is cool",
        snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
        title: "I love express",
        snippet: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
];

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
        .sort({ createdAt: -1 })
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

app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found",
    });
});
