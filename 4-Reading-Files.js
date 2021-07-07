const fs = require("fs");

// reading files
fs.readFile("./dummy_files/hello.txt", (err, data) => {
    if (err) {
        console.log(err);
    }
    // data buffer is recieved not string so lets convert
    const stringData = data.toString();
    console.log(stringData);
});

// Notice this gets printed first
console.log("The Last Line ;-)");

// Its because  readFile method is async it carries out other operation until it's result is ready
