module.exports = {
    parse: function (params) {
        request('http://www.hyipexplorer.com', function (error, response, body){
                if (!error && response.statusCode == 200) {

                    var $ = cheerio.load(body);

                    var blocks = $('#content').children();
                    var icons = $('.icon', blocks);
                    var details =[];
                    icons.each(function(index, value){
                        if((index+1) % 4 === 0){
                            details.push($(value).next('a').attr('href'));
                        }
                    });
                    _.each(details, function(index, value){

                        var hyipResult = { monitor_id : 'hyipexplorer' };
                            hyipResult.id = value;

                        request('http://www.hyipexplorer.com'+index, function (error, response, body){
                            if (!error && response.statusCode == 200) {
                                var $ = cheerio.load(body);
                                var content = $('#content').find('table');
                                var first = $(content[0]).find('td');
                                var link = $(first[3]).children().attr('href');
                                hyipResult.name = $(first[3]).find('b').text();
                                hyipResult.plans = $(content[2]).find('.odd').next().children('.a_jr').text();
                                hyipResult.status = $(first[4]).children().text();
                                hyipResult.banner_code = '';

                                request('http://www.hyipexplorer.com'+link, function (error, response, body){
                                    if (!error && response.statusCode == 200) {
                                        hyipResult.URL = response.client._host;
                                            console.log(hyipResult);
                                        }else{
                                            console.log('ERROR from last response '+error);
                                            hyipResult.URL = 'error';
                                            console.log(hyipResult);
                                        }
                                    });

                                }else{
                                console.log('ERROR from second response '+error);
                            }

                        });
                    });

                }else{
                    console.log('ERROR from first response '+error)
                }
            }
        );
    }
};
