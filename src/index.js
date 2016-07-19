_ = require('lodash');
Promise = require('promise');
request = require('request');
cheerio = require('cheerio');


var engine = require('./parsers/engine.js');

engine.startParsing();