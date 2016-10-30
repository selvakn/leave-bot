class Command {

  constructor(text) {
    this.text = text;
  }

  doesMatch() {
    return false;
  }

  answer(employeeRecords) {
    return 'This is an abstract answer';
  }

  static sample() {
    return 'Override me';
  }

  _doesParse(regex) {
    return this.text.match(regex);
  }

}

class Help extends Command {
  doesMatch() {
    return this._doesParse(/^help/i);
  }

  answer(records) {
    var possibleQuestions = ALL_COMMANDS
      .map(c => c.sample())
      .join('\n');
    return `Possible questions\n${possibleQuestions}`;
  }

  static sample() {
    return 'Help';
  }
}

class HerLeaves extends Command {
  doesMatch() {
    return this._doesParse(/leaves.*available.*\s(\d+).*/) ||
      this._doesParse(/leaves.*there.*\s(\d+).*/);
  }

  answer(records) {
    var employeeId = this.doesMatch()[1];
    var record = records.find(r => r[0] == employeeId);
    return record
      ? `${record[1]} has ${record[22]} annual leaves and ${record[25]} optional leaves available!`
      : `Invalid emp id ${employeeId}`;
  }

  static sample() {
    return 'How many leaves are available for <emp-id>?';
  }
}

const ALL_COMMANDS = [Help, HerLeaves];

module.exports = {
  HerLeaves: HerLeaves,
  Help: Help,
  ALL: ALL_COMMANDS
};
