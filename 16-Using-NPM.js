const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const PORT = 6969;

const server = http.createServer((req, res) => {
    // Using Lodash
    const num1 = _.random(0, 20);
    // Using Math :
    // const num2 = Math.round(Math.random() * 20);

    // Running a function only once
    const greet = _.once(() => {
        console.log("hello");
    });

    console.log(num1);
    greet();

    // Sending content to end user
    res.setHeader("Content-Type", "text/html");
    let path = "./views/";
    switch (req.url) {
        case "/":
            path += "index.html";
            res.statusCode = 200;
            break;

        case "/about":
            path += "about.html";
            res.statusCode = 200;
            break;

        case "/about-me":
            res.setHeader("Location", "/about");
            res.statusCode = 301;
            res.end();
            break;

        default:
            path += "404.html";
            res.statusCode = 404;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data);
        }
    });
});

server.listen(PORT, "localhost", () => {
    console.log(`App live on http://localhost:${PORT}`);
});
