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
    var record = records
      .map(r => new EmployeeRecord(r))
      .find(r => r.getEmpId() == employeeId);

    return record
      ? `${record.getName()} has ${record.getAvailableAnnualLeaves()} annual leaves and ${record.getAvailableOptionalLeaves()} optional leaves available!`
      : `Invalid emp id ${employeeId}`;
  }

  static sample() {
    return 'How many leaves are available for <emp-id>?';
  }
}

class MoreLeavesThanHer extends Command {
  doesMatch() {
    return this._doesParse(/more.*leaves.*than.*\s(\d+).*/);
  }

  answer(records) {
    var employeeId = this.doesMatch()[1];
    var allEmployees = records.map(r => new EmployeeRecord(r));
    var record = allEmployees.find(r => r.getEmpId() == employeeId);

    if(!record) return `Invalid emp id ${employeeId}`;

    var herLeaves = record.getAvailableLeaves();

    var poepleWithMoreLeaves = allEmployees
      .filter(r => r.getAvailableLeaves() > herLeaves)
      .sort((r1, r2) => r2.getAvailableLeaves() - r1.getAvailableLeaves());

    if(poepleWithMoreLeaves.length === 0) return `No one has more leaves than ${record.getName()} (${record.getAvailableLeaves()})`;

    return [
      poepleWithMoreLeaves.map(r => `${r.getName()} (${r.getAvailableLeaves()})`).join('\n'),
      `\nhave more leaves than ${record.getName()} (${record.getAvailableLeaves()})`
      ].join('');
  }

  static sample() {
    return 'Who have more leaves than <emp-id>?';
  }
}

class LeaderBoard extends Command {
  doesMatch() {
    return this._doesParse(/most.*leaves/);
  }

  answer(records) {
    var leaders = records
      .map(r => new EmployeeRecord(r))
      .sort((r1, r2) => r2.getAvailableLeaves() - r1.getAvailableLeaves())
      .slice(0, 10);

    return leaders.map(r => `${r.getName()} (${r.getAvailableLeaves()})`).join('\n');
  }

  static sample() {
    return 'Who has the most number of leaves?';
  }
}

class EmployeeRecord {
  constructor(array) {
    this.empId = array[0];
    this.name = array[1];
    this.availableAnnualLeaves = parseFloat(array[22]);
    this.availableOptionalLeaves = parseFloat(array[25]);
  }

  getName() {
    return this.name;
  }

  getEmpId() {
    return this.empId;
  }

  getAvailableAnnualLeaves() {
    return this.availableAnnualLeaves;
  }

  getAvailableOptionalLeaves() {
    return this.availableOptionalLeaves;
  }

  getAvailableLeaves() {
    return this.getAvailableAnnualLeaves() + this.getAvailableOptionalLeaves();
  }
}


const ALL_COMMANDS = [Help, HerLeaves, MoreLeavesThanHer, LeaderBoard];

module.exports = {
  HerLeaves: HerLeaves,
  Help: Help,
  MoreLeavesThanHer: MoreLeavesThanHer,
  LeaderBoard: LeaderBoard,
  ALL: ALL_COMMANDS
};
