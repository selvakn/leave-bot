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
    var command = new MoreLeavesThanHer('Who has more leaves than 12262?');

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

        expect(answer).to.eq('Vijay (12)\nVictor (8)\nhave more leaves than Selva (7.5)');
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
          ['1', 'A', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '1', null, null, '1'],
          ['2', 'B', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2', null, null, '1'],
          ['3', 'C', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '3', null, null, '1'],
          ['4', 'D', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '4', null, null, '1'],
          ['5', 'E', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '5', null, null, '1'],
          ['6', 'F', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '6', null, null, '1'],
          ['7', 'G', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '7', null, null, '1'],
          ['8', 'H', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '8', null, null, '1'],
          ['9', 'I', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '9', null, null, '1'],
          ['10', 'J', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '10', null, null, '1'],
          ['11', 'K', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, '11', null, null, '1'],
        ]);

        expect(answer).to.eq('K (12)\nJ (11)\nI (10)\nH (9)\nG (8)\nF (7)\nE (6)\nD (5)\nC (4)\nB (3)');
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
