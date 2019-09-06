const toastr = require('toastr');

const apiUrl = 'http://localhost:9000/api';
const headers = {'Content-Type': 'application/json'};

const chore = (res) => {
  if (!res.ok) {
    if (res.status === 503) return Promise.reject("Service currently unavailable");
    if (res.status === 401) return Promise.reject("Unauthorized");
    if (res.status === 403) return Promise.reject("Forbidden");
    return Promise.reject(res.message || "Unknown error"); // TODO Not sure about message key.
  }
  return res.json();
};

module.exports.login = (username, password) =>
    fetch(
        apiUrl + '/auth/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers,
        })
        .then(chore)
        .catch(err => {
          toastr.error(err);
          return Promise.reject(err);
        });

module.exports.applicants = () =>
    fetch(
        apiUrl + '/tournament/current/applications', {
          method: 'GET',
          headers,
        })
        .then(chore)
        .catch(err => {
          toastr.error(err);
          return Promise.reject(err);
        });
