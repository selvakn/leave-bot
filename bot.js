'use strict';

var botBuilder = require('claudia-bot-builder');
var data = require('./data.js');
var parser = require('parse_and_answer');


module.exports = botBuilder(function (request) {
  data()
    .then(empRecords => parser.findAnswer(request, empRecords))
    .catch(() => 'Not able to read the spreadsheet :(');
});
