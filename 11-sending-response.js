const http = require("http");
const PORT = 6969;

const server = http.createServer((req, res) => {
    console.log("Request received");
    console.log(req.url, req.method);

    // set header content type
    res.setHeader("Content-Type", "text/html");
    res.write(
        `<head><title>OUR OWN NODE SERVER</title>
        <link rel="stylesheet" href="#"></link></head>
        `
    );
    res.write("<h1>Hello, world!</h1>");
    res.write("<h3>You can see this response back from the server!</h3>");
    res.end();
    console.log("Response sent!");
});

server.listen(PORT, "localhost", () => {
    console.log(`App live on http://localhost:${PORT}`);
});
