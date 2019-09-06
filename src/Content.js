import React from 'react'
import {connect} from "react-redux";
import {authLogout} from "./redux/actions";
import Login from "./Login";
import DrawOpponents from "./DrawOpponents";

class Content extends React.Component {

  render() {
    if (this.props.route === '/login') {
      return <Login/>;
    } else {
      if (!this.props.authUser) {
        return (
            <p><strong>CWT Qualifiers</strong> is a tool to manage easy match-making
              specifically for CWT qualifiers as it leverages the CWT 6 API.</p>
        );
      } else {

        if (this.props.authUser.roles.indexOf('ROLE_ADMIN') !== -1) {
          return <DrawOpponents/>;
        } else {
          return <p>User {this.props.authUser.username}</p>;
        }
      }
    }
  }
}

export default connect(state => ({authUser: state.auth}), {authLogout})(Content);
