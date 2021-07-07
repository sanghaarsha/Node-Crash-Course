const fs = require("fs");

const readStream = fs.createReadStream("./dummy_files/blob_for_stream.txt", {
    encoding: "utf8",
});

const writeStream = fs.createWriteStream(
    "./dummy_files/blob_for_write_stream.txt"
);

// readStream.on("data", (chunk) => {
//     // logging to console
//     console.log("\n------ NEW CHUNK RECEIVED -------\n");
//     console.log(chunk);
//     // writing to file
//     writeStream.write("\n------ NEW CHUNK RECEIVED AND WRITTEN -------\n");
//     writeStream.write(chunk);
// });

// short way to do same as above :

// piping
// (pass data from readable to writeable stream)
readStream.pipe(writeStream);
