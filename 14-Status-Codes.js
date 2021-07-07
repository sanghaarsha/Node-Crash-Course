// 200 : Everything - OK !
// 301 : Resource Moved
// 404 : Not Found
// 500 : Internal Server Error

// Information from Range
// 100 Range - Informational Responses
// 200 Range - Success Codes
// 300 Range - Codes for Redirects
// 400 Range - User or Client Error
// 500 Range - Server Error

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
