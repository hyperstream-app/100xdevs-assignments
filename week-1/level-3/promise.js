/* Under the hood, the same thing is happening as the callback/cb thing. However, this is purely a syntactical sugar for better understanding. Now you can understand that control first reaches mehulsReadFile(), it then goes to the function definition. There it creates an object of class Promise. It then runs the Promise logic, and since it saw an async function, it leaves a thread there and comes back to console statement at line #18 and runs it but because the promise has not been yet completed so it shows pending. Then it sees a .then() statement meaning only when the promise is resolved will the logic inside .then be called. */

function mehulsReadFile() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("hi there");
    }, 2000);
  });
}

function onDone(data) {
  console.log(data);
}

var a = mehulsReadFile();
console.log(a); // shows promise pending
a.then(onDone); // shows actual data
