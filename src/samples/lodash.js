var _ = require('lodash');
var obj = JSON.parse('{"test":{"test1" : 2}, "hui":{ "test33" :1, "test":2}}');

var vals = _.values(obj);
console.log(vals);
_.each(vals, function (value) {
    console.log("EACH:" + value.test33);
})
//console.log(obj.test);