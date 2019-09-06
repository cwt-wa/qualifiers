import React from 'react';
import {connect} from "react-redux";

import Fetch from './fetch';
import {authLogin} from "./redux/actions";

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
        .then(res => this.props.authLogin(res.token));
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
}

export default connect(
    null,
    {authLogin}
)(Login);
