/* Under the hood, it is THE EXACTLY SAME as .then() logic but WAYYYYYY CLEANER. We make use of async-await keywords to achieve the same results.  */

function mehulsAsyncFn() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("promise resolved!");
    }, 20000);
  });
}

async function main() {
  let a = await mehulsAsyncFn(); // reaches here and stops because it sees await keyword but the main thread still wants to continue so it leaves a child thread to inform the main when await has been resolved to run further code (2)

  /* EXACT SAME WORKING BY .then():
  mehulsAsyncFn().then((data) => console.log(data))
   */
  
  console.log("thread did stop for sometime"); // now when the await has been resolved, the child thread informs the same and so main thread now runs this (6)
  console.log(a); // then this (7)
}

main(); // Thread calls this and goes inside the function (1)
console.log("thread supremacy!"); // the thread comes back to run this logic (3)
console.log("thread supremacy 2!"); // the thread still runs this logic (4)

// expensive yet in the root position
let a = 0;
for (let i = 0; i < 10000000000; i++) {
  a++;
}
console.log("thread supremacy 3!"); // the thread still runs this logic (5)