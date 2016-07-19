var util  = require('util');
module.exports = {
    parse: function (params) {
        request('http://monhyip.net/', function (error, response, body) {
                if (!error && response.statusCode == 200) {

                    var $ = cheerio.load(body);

                    var result = [];
                    var blocks = $('.hyip_list_item');

                    blocks.each(function(index, block){

                        var hyipResult = {};

                            hyipResult.id = index;
                            hyipResult.labels = [];


                        var elemnts = $('tr', block);

                            elemnts.each(function(i, val){

                                var lab = $('.label', val);

                                lab.each(function(ind, value){

                                    hyipResult.labels.push($(value));

                                });

                            });

                        result.push(hyipResult);

                    });

                    var all = [];

                    for (var i= 0; i < result.length; i++){

                            result[i].name = $(result[i].labels[0]).children().text();
                            result[i].url = $(result[i].labels[0]).children().html();

                    }
                    console.log(result);

                }
            }
        );
    }
}