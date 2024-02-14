const fs = require("fs");

fs.readFile("../tests/hello.txt", "utf-8", (err, data) => {
  console.log(data);
});

for (let i = 0; i < 1000000; ++i) {}

console.log("thread idle after this statement");
