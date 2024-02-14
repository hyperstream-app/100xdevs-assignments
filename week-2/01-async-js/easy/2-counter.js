function counter(count) {
  console.log(count);
  count += 1;
  setTimeout(() => counter(count), 1000);
}

setTimeout(() => counter(1), 1000);
