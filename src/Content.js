import React from 'react'
import {connect} from "react-redux";
import {authLogout} from "./redux/actions";
import Login from "./Login";
import DrawOpponents from "./DrawOpponents";
import ShowDraw from "./ShowDraw";

class Content extends React.Component {

  render() {
    if (this.props.route === '/login') {
      return <Login/>;
    }

    if (this.props.draw.length) {
      return <ShowDraw/>
    } else {
      if (this.props.authUser && this.props.authUser.roles.indexOf('ROLE_ADMIN') !== -1) {
        return <DrawOpponents/>;
      }
    }

    return <p><strong>CWT Qualifiers</strong> is a tool to manage easy match-making
      specifically for CWT qualifiers as it leverages the CWT 6 API.</p>;
  }

  componentDidMount() {
    // TODO Load draw from database.
  }
}

export default connect(state => ({authUser: state.auth, draw: state.draw}), {authLogout})(Content);
