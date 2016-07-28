module.exports = {
    parse: function (params) {
        request('http://monhyip.net/', function (error, response, body){
            if (!error && response.statusCode == 200) {

                var $ = cheerio.load(body);

                var blocks = $('.hyip_list_item');

                blocks.each(function(index, block){

                    var hyipResult = { monitor_id : 'monhyip' };

                        hyipResult.id = index;

                        var elements = $('tr', block).slice(2, 3);
                        var link_details = $('a', $(elements));

                            request('http://monhyip.net'+link_details.attr('href'), function (error, response, body){
                                if (!error && response.statusCode == 200) {
                                    var $ = cheerio.load(body);
                                    var project_page = $('.projdetails').first();
                                    var lines = $('tr', $(project_page));
                                    var link = $(lines[0]).find('a');
                                    var status = $(lines[0]).find('img');
                                    var plans = $(lines[5]).find('span');
                                    var banner = $(lines[13]).find('img');
                                    hyipResult.name = link.html();
                                    hyipResult.plans = plans.text().replace(/\s+/g,'|');
                                    hyipResult.banner_code = banner.attr('src');
                                    hyipResult.status = status.attr('src');
                                        request('http://monhyip.net'+link.attr('href'), function (error, response){
                                            if (!error && response.statusCode == 200) {
                                                hyipResult.URL = response.client._host;
                                                /*params.save(hyipResult);
                                                console.log(hyipResult);*/
                                            }
                                        });
                                }
                            });
                });
            }
            }
        );
    }
};
