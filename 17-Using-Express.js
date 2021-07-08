const express = require("express");
const app = express();

// GET
app.get("/", (req, res) => {
    res.sendFile("./views/index.html", { root: __dirname });
});

// path of current root directory
const relativePath = __dirname;

app.get("/about", (req, res) => {
    res.sendFile(relativePath + "/views/about.html");
});

// redirect
app.get("/about-me", (req, res) => {
    res.redirect("/about"); // status code is automatically set by express
});

// 404 page
// first way :
// app.get("*", (req, res) => {
//     res.status(404).sendFile(relativePath + "/views/404.html");
// });

// second way: (this function is fired when none of the function gets called to send some response back, it must always be put in bottom of all get requests)
app.use((req, res) => {
    res.status(404).sendFile(relativePath + "/views/404.html");
});

// Listening the app
const PORT = process.env.PORT || 6969;
app.listen(PORT, "localhost", () => {
    console.log(`App running on http://localohst:${PORT}`);
});
