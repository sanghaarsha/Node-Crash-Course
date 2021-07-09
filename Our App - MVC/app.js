const ejs = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

//  set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Static route middleware
app.use(express.static("./views/public"));

// for dotenv
require("dotenv").config();

// PORT Value
const PORT = process.env.PORT || 3000;

// Connecting Mongodb
dbURI = process.env.dbURI;

mongoose
    .connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`App running at http://localhost:${PORT}`);
        });
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
app.use("/blogs", require("./routes/blogRoutes"));

// 404
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Page Not Found",
    });
});
