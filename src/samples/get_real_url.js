var afix = require('request');

afix('http://monhyip.net/gotohyip/brilliantinv', function (err, data) {
    if (err) return;

    var host = data.client._host;

    console.log(host);
});