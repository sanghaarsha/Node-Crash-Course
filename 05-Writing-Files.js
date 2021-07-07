const fs = require("fs");

// Writing files
fs.writeFile(
    "./dummy_files/new_file.txt",
    "This new file is created using node!",
    () => {
        console.log("File written successfully!");
    }
);
