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
          {this.props.authUser
              ? (
                  <li>
                    <button type="button" onClick={this.logOut} className="btn-link">
                      Log out
                    </button>
                  </li>)
              : (
                  <li>
                    <a className={this.props.route === '/login' ? 'active' : null} href="#/login">
                      Login
                    </a>
                  </li>)}
        </ul>
    )
  }
}

export default connect(state => ({authUser: state.auth}), {authLogout})(Navigation);
