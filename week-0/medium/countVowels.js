/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  let originalLen = str.length;
  str = str.toLowerCase().replace(/(a|e|i|o|u)/g, "");
  return originalLen - str.length;
}

module.exports = countVowels;
