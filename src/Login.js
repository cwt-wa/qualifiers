import React from 'react';

const toastr = require('toastr');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  submit = e => {
    e.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    fetch(
        'http://localhost:9000/api/auth/login', {
          method: 'POST',
          body: JSON.stringify({username, password}),
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
          if (!res.ok) {
            if (res.status === 503) throw Error("Service unavailable.");
            if (res.status === 401) throw Error("Invalid credentials.");
            throw Error("Unknown error.")
          }
          return res.json();
        })
        .then(res => {
          // todo login
        })
        .catch(err => toastr.error(err));
  };

  render() {
    return (
        <form onSubmit={this.submit}>
          <div>
            <label form="username">Username</label>
            <input type="text" name="username" id="username" value={this.state.username}
                   onChange={this.onChange}/>
          </div>
          <div>
            <label form="passwords">Password</label>
            <input type="password" name="password" id="password" value={this.state.password}
                   onChange={this.onChange}/>
          </div>
          <div>
            <input type="submit" value="Sign in"/>
          </div>
        </form>
    );
  }
};
