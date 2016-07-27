var pg = require('pg'),
    md5 = require('md5');

var config = {
    host: 'ec2-46-137-73-65.eu-west-1.compute.amazonaws.com',
    user: 'dgtrkyogwtyrco',
    database: 'deckg8ls8v33q2',
    password: 'RKQdlkuPHXOMfXm9Yx5cxXc3Ej',
    port: 5432,
    max: 10000,
    idleTimeoutMillis: 30000,
};
pg.defaults.ssl = true;

var Session = function(client) {
    this.client = client;
}
Session.prototype = {
    save : function (hyip) {
        if (!hyip) return false;
        if (!hyip.monitor_id) return false;

        var id = md5(Math.random() + new Date().getTime());
        this.client.query("INSERT INTO hyips(id, monitor_id, name, url, plans, banner_code) values($1, $2, $3, $4, $5, $6)", [id, hyip.monitor_id, hyip.name, hyip.url, hyip.plans, hyip.banner_code]);

        return true;
    },

    deleteAll : function () {
        this.client.query("DELETE FROM hyips");
    },

    all : function (_return) {
        var query = this.client.query("SELECT * FROM hyips;"),
            result = [];

        query.on('row', function(row) {
            result.push(row);
        });

        query.on('end', function() {
            _return(result);
        });
    },
}
module.exports = {
    startSession : function (process) {
        var pool = new pg.Pool(config);
        pool.connect(function(err, client, done) {
            process(new Session(client));
            done();
        });
    },

    _query : function (callback, retry) {

        var pool = new pg.Pool(config),
            $this = this;

        retry = retry || 0;
        pool.connect(function(err, client, done) {
            if (err) {
                setTimeout(function () {
                    $this._query(callback, retry + 1)
                }, 3000);

                if (retry >= 20) throw err;
            }
            callback(client, done);
        });
    }
}