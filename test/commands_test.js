var expect = require('chai').expect;
var commands = require('../lib/commands/commands.js');
var HerLeaves = commands.HerLeaves;
var Help = commands.Help;
var MoreLeavesThanHer = commands.MoreLeavesThanHer;
var LeaderBoard = commands.LeaderBoard;

describe('Commands', function () {
  describe('HerLeaves', function () {
    var command = new HerLeaves('How many leaves are available for 12262?');

    describe('#doesMatch', function () {

      it('should match the questions', function () {
        expect(command.doesMatch()).to.be.ok;
      });

      it('should not match other questions', function () {
        var command = new HerLeaves('How many leaves do I have?');
        expect(command.doesMatch()).not.to.be.ok;
      });

    });

    describe('#answer', function () {
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


  describe('MoreLeavesThanHer', function () {
    var command = new MoreLeavesThanHer('Who have more leaves than 12262?');

    describe('#doesMatch', function () {

      it('should match the questions', function () {
        expect(command.doesMatch()).to.be.ok;
      });
    });

    describe('#answer', function () {
      it('should the answer from the matched result', function () {
        var answer = command.answer([
          ['10300', 'Vijay', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '10', null, null, '2'],
          ['10301', 'Victor', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '6', null, null, '2'],
          ['10302', 'Sam', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '6', null, null, '0'],
          ['12262', 'Selva', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '5.5', null, null, '2']
        ]);

        expect(answer).to.eq('Vijay (12), Victor (8) have more leaves than Selva (7.5)');
      });

      it('should the answer when no one has more leaves', function () {
        var answer = command.answer([
          ['10300', 'Vijay', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', null, null, '2'],
          ['12262', 'Selva', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '5.5', null, null, '2']
        ]);

        expect(answer).to.eq('No one has more leaves than Selva (7.5)');
      });

      it('should handle invalid emp id', function () {
        var answer = command.answer([
        ]);

        expect(answer).to.eq('Invalid emp id 12262');
      });

    });
  });

  describe('LeaderBoard', function () {
    var command = new LeaderBoard('Who has the most number of leaves?');

    describe('#doesMatch', function () {

      it('should match the questions', function () {
        expect(command.doesMatch()).to.be.ok;
      });
    });

    describe('#answer', function () {
      it('should the answer from the matched result', function () {
        var answer = command.answer([
          ['10300', 'Vijay', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '10', null, null, '2'],
          ['12262', 'Selva', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '5.5', null, null, '2']
        ]);

        expect(answer).to.eq('Vijay (12), Selva (7.5)');
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
