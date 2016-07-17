var Promise = require('promise');

function te() {
    try {
        throw new Error('faile');
    } catch (exdx) {
        console.log('1111');
    }
}

te();

var promise = new Promise(function (resolved, rejected) {
    try {
        setTimeout(function () {
            console.log('DONE');
            var rand = Math.random();
            if (true) {
                te();
            }
            resolved(true);
        }, 2000);
    } catch (err) {
        console.log("11111");

        rejected(err);
    }
});

promise.then(function (param) {
    console.log(param)
},function (ex) {
    console.log("aaaa");
    console.log(ex + " HANDLED ");
});

promise.then(function () {
    console.log('ALLDONE');
})
