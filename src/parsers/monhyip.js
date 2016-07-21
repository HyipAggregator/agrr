module.exports = {
    parse: function (params) {
        request('http://monhyip.net/', function (error, response, body){
                if (!error && response.statusCode == 200) {

                    var $ = cheerio.load(body);

                    var result = [];

                    var blocks = $('.hyip_list_item');

                    blocks.each(function(index, block){

                        var hyipResult = {};

                            hyipResult.id = index;

                            var elements = $('tr', block).slice(2, 3);
                            var links_details = $('a', $(elements));

                                    request('http://monhyip.net'+$(links_details).attr('href'), function (error, response, body){
                                        if (!error && response.statusCode == 200) {
                                                var $ = cheerio.load(body);
                                                var project_page = $('.projdetails').first();
                                                var lines = $('tr', $(project_page));
                                                var link = $(lines[0]).find('a');
                                                hyipResult.name = link.html();
                                                    request('http://monhyip.net'+link.attr('href'), function (error, response){
                                                        if (!error && response.statusCode == 200) {
                                                            hyipResult.URL = response.client._host;
                                                            console.log(hyipResult);
                                                        }
                                                    });
                                        }
                                    });
                    });
                    console.log(result);
                }
            }
        );
    }
};
