const http = require("http");
const fs = require("fs");

const PORT = 6969;

const server = http.createServer((req, res) => {
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
            res.statusCode = 301; // permanent redirect code
            res.end();
            break;

        default:
            path += "404.html";
            res.statusCode = 404;
    }

    res.setHeader("Content-Type", "text/html");
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
