const express = require("express");
const morgan = require("morgan");
const app = express();

//  set view engine
app.set("view engine", "ejs");
app.set("views", "EJS-Views");

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

// Creating our own middleware
app.use((req, res, next) => {
    console.log("New Request Made: ");
    console.log("host: ", req.hostname);
    console.log("path: ", req.path);
    console.log("method: ", req.method);
    next();
});

// Using 3rd party middleware : morgan
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

// Listening the app
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`App running on http://localohst:${PORT}`);
});
