const fs = require("fs");

const text = "dis some dummy text bro";
fs.writeFile("../tests/hello.xlsx", text, () => {
  console.log("done bro");
});
