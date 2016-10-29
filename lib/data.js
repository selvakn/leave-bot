var google = require('googleapis');

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

function data() {
  var auth = new google.auth.JWT('leave-bot@praxis-study-147902.iam.gserviceaccount.com', './key.pem', null, SCOPES);

  return new Promise(function(resolve, reject){
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: '1XJpBKS6FmPwf9T6sCmPrybXyPeD8S51vwuN-cSogers',
      range: 'A3:Z1400',
    },
    (err, response) => err ? reject(err) : resolve(response.values));
  });
}

module.exports = {
  leaveDetails: data
};
