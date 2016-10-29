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

  _doesParse(regex) {
    return this.text.match(regex);
  }

}

class Help extends Command {
  doesMatch() {
    return this._doesParse(/^help/i);
  }

  answer(records) {
    return [
      'Possible questions that you can ask:',
      'How many leaves are available for <emp-id>?'
    ].join('\n');
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
    return `${record[1]} has ${record[22]} annual leaves and ${record[25]} optional leaves available!`;
  }
}

module.exports = {
  HerLeaves: HerLeaves,
  Help: Help,
  ALL: [HerLeaves, Help]
};
