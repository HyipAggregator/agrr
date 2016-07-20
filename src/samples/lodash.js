var _ = require('lodash'),
    util = require('util');

// === OBJECTS ===
//---forIn---
var obj = {
    "attr1" : "val1",
    "attr2" : "val2",
    "attr3" : "val3"
};
_.forIn(obj, function (key, value) {
    console.log("Key : " + key + " , Value : " + value);
});

//---has---
console.log(true === _.has(obj, "attr1"));

//--max,min,sum--
console.log(_.max([4, 2, 8, 6]));
console.log(_.min([4, 2, 8, 6]));
console.log(_.sum([4, 2, 8, 6]));

//---cast array---
console.log(_.castArray(1));
// → [1]

console.log(_.castArray({ 'a': 1 }));
// → [{ 'a': 1 }]

console.log(_.castArray('abc'));
// → ['abc']

console.log(_.castArray(null));
// → [null]

console.log(_.castArray(undefined));
// → [undefined]

console.log(_.castArray());
// → []

var str = util.format('first %s, secons %d third %s', 'foo', 1, 'baz');