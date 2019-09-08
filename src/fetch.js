const toastr = require('toastr');

const apiUrl = 'http://localhost:9000/api';
const headers = {'Content-Type': 'application/json'};
const fallbackMsg = 'An unknown error occurred.';

const chore = (res) => {
  if (!res.ok) throw res;
  return res.json();
};

function toastStatusCodeText(err) {
  if (err.status === 401) toastr.error("Unauthorized");
  else if (err.status === 503) toastr.error("Service unavailable");
  else toastr.error(fallbackMsg);
}

module.exports.defaultErrorHandler = err => {
  if (err.json) {
    err.json()
        .then(resJson => {
          if (!resJson.message) throw err;
          toastr.error(resJson.message);
          console.error(err);
        })
        .catch(errJson => {
          toastStatusCodeText(err);
          console.error(errJson);
        });
  } else {
    toastStatusCodeText(err);
    console.error(err);
  }
};

module.exports.login = (username, password) =>
    fetch(
        apiUrl + '/auth/firebase-login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers,
        })
        .then(chore);

module.exports.refreshAuth = token =>
    fetch(
        apiUrl + '/auth/firebase-refresh', {
          method: 'POST',
          body: JSON.stringify({token}),
          headers,
        })
        .then(chore);

module.exports.applicants = () =>
    fetch(
        apiUrl + '/tournament/current/applications', {
          method: 'GET',
          headers,
        })
        .then(chore);
