const http = require("http");
const fs = require("fs");

const PORT = 6969;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    let path = "./views/";

    switch (req.url) {
        case "/":
            path += "index.html";
            break;

        case "/about":
            path += "about.html";
            break;

        default:
            path += "404.html";
    }
    // set header content type
    res.setHeader("Content-Type", "text/html");

    // read html file from views dir
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
