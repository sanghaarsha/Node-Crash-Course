// App will run on http://localhost:6969

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const app = express();

//  set view engine
app.set("view engine", "ejs");
app.set("views", "EJS-Views");

// for dotenv
require("dotenv").config();
// PORT Value
const PORT = process.env.PORT || 6969;
// Mongodb URI
dbURI = process.env.dbURI;

// Connecting to Mongodb Atlas :
// Use { useNewUrlParser: true, useUnifiedTopology: true } to stop deprecation warnings

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

// mongoose and mongo sandbox routes
app.get("/add-blog", (req, res) => {
    const blog = new Blog({
        title: "New Blog Second",
        snippet: "My Second blog",
        body: "This is the body of my second blog",
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get("/all-blogs", (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get("/single-blog", (req, res) => {
    Blog.findById("60e72a33407531d7520f66b9")
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

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

// Middlewares
app.use(express.static("./EJS-Views/public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Homepage",
        blogs: blogs,
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
    });
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
