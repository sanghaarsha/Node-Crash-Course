const peopleData = require("./2-Modules-Export.js");

const { people, ages } = peopleData;

console.log(people);
console.log(ages);

// importing core node modules
const os = require("os");

console.log(
    `home : ${os.homedir()}\nmachine : ${os.hostname()} @ ${os.version()}, ${os.platform()} @ ARCH : ${os.arch()}
    `
);
