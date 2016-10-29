var chai = require('chai');
var parser = require('../parse_and_answer.js');
var expect = chai.expect;

chai.use(require('chai-string'));

describe('ParseAndAnswer', function () {
  var empRecords = [
    ['10300', 'Vijay', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '10', null, null, '2'],
    ['12262', 'Selva', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '5.5', null, null, '2']
  ];

  describe('findAnswer', function () {
    it('should find the matching command and get answer', function () {
      var answer = parser.findAnswer({text: 'How many leaves are available for 12262?'}, empRecords);

      expect(answer).to.eq('Selva has 5.5 annual leaves and 2 optional leaves available!');
    });

    it('should return proper message if not command matches', function () {
      var answer = parser.findAnswer({text: 'How are you?'}, empRecords);

      expect(answer).to.eq('Not able to understand what you are saying');
    });

    it('should strip @leave-bot:', function () {
      var answer = parser.findAnswer({text: '@leave-bot: help'}, empRecords);
      expect(answer).to.startWith('Possible questions');

      answer = parser.findAnswer({text: '@leave-bot:help'}, empRecords);
      expect(answer).to.startWith('Possible questions');

      answer = parser.findAnswer({text: '@leave-bot help'}, empRecords);
      expect(answer).to.startWith('Possible questions');
    });
  });
});
