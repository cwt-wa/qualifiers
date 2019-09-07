import React from 'react';
import {connect} from "react-redux";

import Fetch from './fetch';
import {authLogin} from "./redux/actions";

const toastr = require('toastr');

class Login extends React.Component {
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

    Fetch.login(username, password)
        .then(res => {
          this.props.authLogin(res.idToken, res.refreshToken);
          toastr.success('Logged in.');
          window.location.href = "/#/";
        });
  };

  render() {
    if (this.props.authenticated) {
      return <p>You are logged in.</p>;
    }

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
}

export default connect(
    state => ({authenticated: state.auth}),
    {authLogin}
)(Login);
