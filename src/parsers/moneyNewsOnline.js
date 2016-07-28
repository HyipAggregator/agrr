module.exports = {
    parse: function (params) {
       request('http://money-news-online.com/monitoring/mno/', function (error, response, body){
                if (!error && response.statusCode == 200) {

                    var $ = cheerio.load(body);


                    var blocks = $('.list');

                    blocks.each(function(index, block){

                        var hyipResult = { monitor_id : 'moneyNewsOnline' };

                        hyipResult.id = index;
                        var link_details = $('.details_menu', block).find('.money');
                        /*console.log(link_details.length);*/

                        request('http://money-news-online.com/monitoring/mno/'+link_details.attr('href'), function (error, response, body){
                            if (!error && response.statusCode == 200) {
                                var $ = cheerio.load(body);
                                var project = $('.Pname').find('a');
                                var plans = $('.plans').find('b');
                                var banner = $('.td_list').find('#ld').prev().find('img');
                                hyipResult.name = project.html();
                                hyipResult.plans = plans.text();
                                hyipResult.banner_code = banner.attr('src');
                                request('http://money-news-online.com/monitoring/mno/'+project.attr('href'), {gzip:true}, function (error, response, body){
                                    if (!error && response.statusCode == 200){
                                        hyipResult.URL = '';
                                        /*params.save(hyipResult);
                                        console.log(hyipResult);*/
                                    }else{console.log(error)}
                                });

                            }
                        });
                    });
                }
            }
        );
    }
};
