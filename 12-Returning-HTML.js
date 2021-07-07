const http = require("http");
const fs = require("fs");

const PORT = 6969;

const server = http.createServer((req, res) => {
    console.log("Request received");
    console.log(req.url, req.method);

    // set header content type
    res.setHeader("Content-Type", "text/html");
    // read html file from views dir
    fs.readFile("./views/index.html", (err, data) => {
        if (err) {
            console.log("Error while sending response:");
            console.log(err);
            res.end();
        } else {
            // for sending multiple datas use this method:
            // res.write(data);

            // single data can be sent in end method
            res.end(data);

            console.log("Response sent!");
        }
    });
});

server.listen(PORT, "localhost", () => {
    console.log(`App live on http://localhost:${PORT}`);
});
