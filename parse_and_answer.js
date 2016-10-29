var availableCommands = require('./commands/commands.js').ALL;

module.exports = {
  findAnswer: function (request, empRecords) {
    var question = request.text.replace(/@leave-bot[:]?[\s]?/, "");

    var command = availableCommands
      .map(c => new c(question))
      .find(c => c.doesMatch());
    if (!command) {
      return 'Not able to understand what you are saying';
    }

    return command.answer(empRecords);
  }
};