/* MAIN IDEA: The main thread will go back to an async callback ONLY if it is IDLE. By this I mean that unless the main thread completes its root jobs, it will not go back to async callbacks. NOTE: outputs by async functions are displayed after all other functions 

Common async functions: fetch api, fs.readFile, setTimeout
*/

console.log("check #1");

function mehulsReadFile(cb) {
  console.log("check #3");
  setTimeout(function () {
    // Thread reached here, it knows it's async function so sends this fn to another thread and goes IDLE
    console.log("check #4"); // When the callback is returned, the thread goes inside the fn and starts executing
    cb("hello");
  }, 2000);
}

function onDone(data) {
  console.log("check #5");
  console.log(data);
}

console.log("check #2");
mehulsReadFile(onDone); // Since it is a main function, the thread goes inside it
