const fs = require("fs");

// Directories

// creating folder if folder with same name doesn't exist
if (!fs.existsSync("./new_dir")) {
    fs.mkdir("./new_dir", (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Folder Created Successfully!");
    });
}
// removing if folder with same name exists
else {
    fs.rmdir("./new_dir", (err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log("Folder with same name deleted!");
}
