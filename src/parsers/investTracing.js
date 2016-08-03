module.exports = {
    parse: function (params) {
        request('http://invest-tracing.com', function (error, response, body){
                if (!error && response.statusCode == 200) {

                    var $ = cheerio.load(body);

                    var blocks = $('.listbody');

                    blocks.each(function(index, block){

                        var hyipResult = { monitor_id : 'investTracing' };
                        hyipResult.id = index;
                        var link_details = $('tr', block).last().find('a').attr('href');
                        /*console.log(hyipResult);
                        console.log(link_details);*/

                        request('http://invest-tracing.com/'+link_details, function (error, response, body){
                            if (!error && response.statusCode == 200) {
                                var $ = cheerio.load(body);
                                var lines = $('.listbody');
                                var link = lines.find('.pro');
                                hyipResult.name = link.text();
                                hyipResult.plans = lines.find('.plan').text();
                                hyipResult.banner = lines.find('.grey1').find('img').attr('src');
                                hyipResult.status = lines.find('.rightline').eq(2).find('img').attr('src');
                                    request('http://invest-tracing.com/'+link.attr('href'), function (error, response, body){
                                        if (!error && response.statusCode == 200){
                                            hyipResult.URL = response.client._host;
                                            /*params.save(hyipResult);
                                            console.log(hyipResult);*/
                                        }else{
                                            /*console.log('ERROR from last response '+error);
                                            hyipResult.URL = 'error';
                                            console.log(hyipResult);*/
                                        }
                                    });

                            }else{
                                console.log('ERROR from second response '+error);
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
