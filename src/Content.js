import React from 'react'
import {connect} from "react-redux";
import {authLogout, draw} from "./redux/actions";
import Login from "./Login";
import DrawOpponents from "./DrawOpponents";
import ShowDraw from "./ShowDraw";
import Fetch from "./fetch";
import Report from "./Report";

class Content extends React.Component {

  state = {loading: true};

  render() {
    if (this.props.route === '/login') {
      return <Login/>;
    } else if (this.props.route === '/report') {
      return <Report/>;
    }

    if (this.state.loading) {
      return <p>Loading…</p>
    } else if (this.props.games.length) {
      return <ShowDraw/>
    } else if (this.props.currentTournament != null) {
      if (this.props.authUser && this.props.authUser.isAdmin) {
        return <DrawOpponents/>;
      }
    } else {
      return <p>There’s no tournament currently.</p>
    }

    return <p><strong>CWT Qualifiers</strong> is a tool to manage easy match-making
      specifically for CWT qualifiers as it leverages the CWT 6 API.</p>;
  }

  componentDidMount() {
    if (this.props.currentTournament != null && (!this.props.games || !this.props.games.length)) {
      Fetch.retrieveDraw(new Date(this.props.currentTournament.created).getUTCFullYear())
          .then(this.props.draw)
          .finally(() => this.setState({loading: false}));
    } else {
      this.setState({loading: false});
    }
  }
}

export default connect(
    state => ({authUser: state.auth, games: state.draw, currentTournament: state.currentTournament}),
    {authLogout, draw})(Content);
