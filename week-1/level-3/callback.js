/* This is an example of a callback function. Here, we are passing the function `cb` (callback) to the function arguement for the `sumOfSomething` function to call it further */
function square(n) {
  return n * n;
}

function cube(n) {
  return n * n * n;
}

function sumOfSomething(a, b, cb) {
  const val1 = cb(a);
  const val2 = cb(b);
  return val1 + val2;
}

const ans = sumOfSomething(2, 2, cube);
console.log(ans);



/* Another variation of this is the anonymous function which is given below. Here, we literally define a function in the parameter of function we are calling. So when we do that, the anonymous function gets passed over to `cb` and it handles it as if we passed the name to it */
const ans_anonymous = sumOfSomething(2, 2, function (n) {
  return n * n * n;
});
console.log(ans);
