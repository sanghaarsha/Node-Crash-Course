// global object ~ equivalent to window object in Browsers

// This :
// global.console.log(global);
// Is equivalent to this :
// console.log(global);

// Runs once after 1sec
setTimeout(() => {
    console.log("1sec passed!");
}, 1000);

// run a function at a interval till given time
setTimeout(() => {
    console.log("Time Out, Exiting Function !!");
    clearInterval(int);
}, 3000);

// runs everytime in interval of 1 sec
const int = setInterval(() => {
    console.log("Running in the Interval !!");
}, 1000);

// getting current directory and file
console.log(__dirname); // current directory
console.log(__filename); // current file
