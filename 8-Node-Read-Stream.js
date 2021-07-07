//  Start Using Data, before it has finished loaded

// fs module
const fs = require("fs");

// create readStream chunk
const readStream = fs.createReadStream("./dummy_files/blob_for_stream.txt", {
    encoding: "utf8",
});

// everytime readStream gets chunk of data, this events gets fired up
readStream.on("data", (chunk) => {
    console.log("\n------NEW CHUNK-----\n");
    // prints readable string as readStream already specified data to be UTF8 encoded
    // console.log(chunk);

    // print the string buffer
    console.log(Buffer.from(chunk, "utf-8"));
});
