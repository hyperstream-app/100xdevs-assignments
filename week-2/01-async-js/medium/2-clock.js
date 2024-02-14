function displayDateWithAmPm() {
  const dateObj = new Date().toLocaleTimeString();
  console.log(dateObj);
}

// function displayDate() {
// let [hours, minutes, seconds] = [
//   dateObj.getHours(),
//   dateObj.getMinutes(),
//   dateObj.getSeconds(),
// ];
// console.log(`${hours}:${minutes}:${seconds}`);
// }

setInterval(displayDateWithAmPm, 1000);
