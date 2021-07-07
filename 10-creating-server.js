const http = require("http");
const PORT = 6969;

const server = http.createServer((req, res) => {
    console.log("Request received");
});

server.listen(PORT, "localhost", () => {
    console.log(`App live on http://localhost:${PORT}`);
});
