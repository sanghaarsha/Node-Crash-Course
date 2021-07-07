const fs = require("fs");

if (fs.existsSync("./dummy_files/remove.txt")) {
    fs.unlink("./dummy_files/remove.txt", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("File deleted");
    });
} else {
    console.log("File not found!");
}
