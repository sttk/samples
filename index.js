const path = require('path');
const os = require('os');

console.log('Platform:' + os.platform());

console.log('1.');
try {
  console.log('>' + path.basename(null) + '<');
  console.log(typeof path.basename(null));
} catch (e) {
  console.log(e);
}

console.log('2.');
try {
  console.log('>' + path.basename(123) + '<');
  console.log(typeof path.basename(123));
} catch (e) {
  console.log(e);
}

console.log('3.');
console.log('>' + path.basename('aaa/bbb', 'bbb') + '<');

console.log('4.');
console.log('>' + path.basename('aaa/bbb', '/bbb') + '<');

console.log('5.');
console.log('>' + path.basename('aaa/bbb', 'a/bbb') + '<');


console.log('6.');
try {
  console.log('>' + path.basename('aaa/bbb', null) + '<');
  console.log(typeof path.basename('aaa/bbb', null));
} catch (e) {
  console.log(e);
}

console.log('7.');
try {
  console.log('>' + path.basename('aaa/bbb', 123) + '<');
  console.log(typeof path.basename('aaa/bbb', 123));
} catch (e) {
  console.log(e);
}
