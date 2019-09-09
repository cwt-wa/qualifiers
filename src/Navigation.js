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

          {this.props.canReport && (
              <li>
                <a className={this.props.route === '/report' ? 'active' : null} href="#/report">
                  Report
                </a>
              </li>)}

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

export default connect(state => {
  const canReport = state.auth && state.draw && Object.keys(state.draw)
      .filter(gKey => state.draw[gKey].homeUser.id === state.auth.id || state.draw[gKey].awayUser.id === state.auth.id)
      .filter(gKey => state.draw[gKey].homeScore == null && state.draw[gKey].awayScore == null)
      .length === 1;
  return ({authUser: state.auth, canReport});
}, {authLogout})(Navigation);
