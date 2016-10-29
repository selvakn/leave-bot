var botBuilder = require('claudia-bot-builder');
var data = require('./lib/data.js');
var parser = require('./dist/parse_and_answer.js');


module.exports = botBuilder(function (request) {
  return data.leaveDetails()
    .then(empRecords => parser.findAnswer(request, empRecords))
    .catch((e) => {
      console.error(e);
      return 'Not able to read the spreadsheet :( ' + e
    });
});
