/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
  const p = new Promise(function (resolve) {
    const startTime = new Date().getTime();
    while (Date.now() - startTime < milliseconds) {}
    resolve();
  });
  return p;
}

module.exports = sleep;
