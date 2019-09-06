import React from "react";
import {connect} from "react-redux";
import {authLogout} from "./redux/actions";

const toastr = require('toastr');

class Navigation extends React.Component {

  logOut = e => {
    e.preventDefault();
    this.props.authLogout();
    toastr.success('Logged out.');
  };

  render() {
    return (
        <ul>
          <li>
            <a className={this.props.route === '/' ? 'active' : null} href="#/">
              Home
            </a>
          </li>
          {this.props.authenticated
              ? (
                  <li>
                    <a onClick={this.logOut} className="pointer">
                      Log out
                    </a>
                  </li>)
              : (
                  <li>
                    <a className={this.props.route === '/login' ? 'active' : null} href="#/login">
                      Login
                    </a>
                  </li>)
          }
        </ul>
    )
  }
}

export default connect(state => ({authenticated: state.auth}), {authLogout})(Navigation);
