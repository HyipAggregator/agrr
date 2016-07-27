var repository = require('./../domain/repository');

module.exports = {

    /**
     * Start parsing, initialize all enabled parsers
     */
    startParsing : function () {
        var cfg = this._createParsers();

        cfg.done(function (parsers) {
            repository.startSession(function (session) {
                _.each(parsers, function (parser) {
                    parser.parse({
                        startAt : new Date(),
                        save : function (hyip) {
                            return session.save(hyip);
                        }
                    });
                });
            });
        });
    },

    /**
     * Parse config file and initialize parsers
     * @param configFile
     * @returns {Promise}
     * @private
     */
    _createParsers : function (configFile) {
        configFile = configFile || __dirname + '/config.json';
        var fs = require('fs'),
            result = [];

        return new Promise(function (resolve, reject) {
            fs.readFile(configFile, 'utf8', function (err, data) {
                if (err) {
                    reject(err);
                }
                config = JSON.parse(data);

                var parsers = _.values(config);
                _.each(parsers, function(configValue){
                    result.push(require('./' + configValue.parser));
                });
                resolve(result);
            });
        });
    }
}