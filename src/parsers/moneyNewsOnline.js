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
                                var status = $('.ul_1').find('tr').first().find('img');
                                var banner = $('.td_list').find('#ld').prev().find('img');
                                hyipResult.name = project.html();
                                hyipResult.plans = plans.text();
                                hyipResult.status = status.attr('src');
                                hyipResult.banner_code = banner.attr('src');
                                request('http://money-news-online.com/monitoring/mno/'+project.attr('href'), function (error, response, body){
                                    if (!error && response.statusCode == 200){
                                        hyipResult.URL = response.client._host;
                                        /*params.save(hyipResult);
                                        console.log(hyipResult);*/
                                    }else{
                                        /*console.log('ERROR from last response '+error);
                                        console.log(hyipResult.id);
                                        hyipResult.URL = 'error';*/
                                    }
                                });

                            }else{
                                /*console.log('ERROR from second response '+error);
                                console.log(hyipResult.id);*/
                            }
                        });
                    });
                }else{
                    /*console.log('ERROR from first response '+error)*/
                }
            }
        );
    }
};
