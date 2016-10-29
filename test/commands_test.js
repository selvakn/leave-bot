var expect = require('chai').expect;
var commands = require('../lib/commands/commands.js');
var HerLeaves = commands.HerLeaves;
var Help = commands.Help;

describe('Commands', function () {
  describe('HerLeaves', function () {

    describe('#doesMatch', function () {

      it('should match the questions', function () {
        var command = new HerLeaves('How many leaves are available for 12262?');
        expect(command.doesMatch()).to.be.ok;
      });

      it('should not match other questions', function () {
        var command = new HerLeaves('How many leaves do I have?');
        expect(command.doesMatch()).not.to.be.ok;
      });

    });

    describe('#answer', function () {
      var command = new HerLeaves('How many leaves are available for 12262?');

      it('should the answer from the matched result', function () {
        var answer = command.answer([
          ['10300', 'Vijay', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '10', null, null, '2'],
          ['12262', 'Selva', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '5.5', null, null, '2']
        ]);

        expect(answer).to.eq('Selva has 5.5 annual leaves and 2 optional leaves available!');
      });

      it('should handle invalid emp id', function () {
        var answer = command.answer([
        ]);

        expect(answer).to.eq('Invalid emp id 12262');
      });

    });
  });

  describe('Help', function () {

    describe('#doesMatch', function () {

      it('should match the questions', function () {
        expect(new Help('help').doesMatch()).to.be.ok;
        expect(new Help('Help').doesMatch()).to.be.ok;
        expect(new Help('help me').doesMatch()).to.be.ok;
      });
    });
  });
});
