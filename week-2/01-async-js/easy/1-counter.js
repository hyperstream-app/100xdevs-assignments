function counter() {
  console.log(count);
  ++count;
}

let count = 1;
setInterval(function () {
  counter();
}, 1000);
