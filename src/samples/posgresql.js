var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
    host: 'ec2-46-137-73-65.eu-west-1.compute.amazonaws.com',
    user: 'dgtrkyogwtyrco', //env var: PGUSER
    database: 'deckg8ls8v33q2', //env var: PGDATABASE
    password: 'RKQdlkuPHXOMfXm9Yx5cxXc3Ej', //env var: PGPASSWORD
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
pg.defaults.ssl = true;
//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    client.query('CREATE TABLE hyips (' +
    'id VARCHAR(36) PRIMARY KEY,' +
        'monitor_id VARCHAR(20) NOT NULL,' +
        'name VARCHAR(500),' +
        'url VARCHAR(500),' +
        'plans VARCHAR(500),' +
        'banner_code TEXT)', function (err) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }
        console.log('All done');
    });
    /*client.query('SELECT $1::int AS number', ['1'], function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if(err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });*/
});
