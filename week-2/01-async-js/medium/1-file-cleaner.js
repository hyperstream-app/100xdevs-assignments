const fs = require("fs");
const filePath = "../tests/hello.txt";

let content = fs.readFileSync(filePath, "utf-8");
let newContent = [];

content.split(" ").forEach((element) => {
  if (element.match(/\S/g)) {
    newContent.push(element);
  }
});
newContent = newContent.join(" ");

fs.writeFile(filePath, newContent, "utf-8", () => {
  console.log("work done boss!");
});

// string to be cleaned: hello     world    my    name   is       raman
