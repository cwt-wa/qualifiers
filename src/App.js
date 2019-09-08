import React from 'react';
import {Router} from 'director/build/director'
import Navigation from "./Navigation";
import Content from "./Content";
import {connect} from "react-redux";
import {authLogin, authLogout, saveCurrentTournament} from "./redux/actions";
import Fetch from "./fetch";

class App extends React.Component {

  state = {route: null, loading: true};

  render() {
    return (
        <>
          <div className="navbar">
            <div className="container">
              <Navigation route={this.state.route}/>
            </div>
          </div>

          <div className="container">
            <div className="content">
              <h1 className="no-wrap">CWT Qualifiers</h1>
              {this.state.loading ? <p>Loading…</p> : <Content route={this.state.route}/>}
            </div>
          </div>
        </>
    );
  }

  componentDidMount() {
    Router({
      '/': () => this.setState({route: '/'}),
      '/login': () => this.setState({route: '/login'})
    }).init('/');

    const idToken = window.localStorage.getItem('idToken');
    if (idToken != null) this.props.authLogin(idToken);

    const refreshToken = window.localStorage.getItem('refreshToken');
    let refreshAuthPromise;
    if (refreshToken != null) {
      refreshAuthPromise = Fetch.refreshAuth(refreshToken);
      refreshAuthPromise
          .then(freshTokens => this.props.authLogin(freshTokens.idToken, freshTokens.refreshToken))
          .catch(() => this.props.authLogout());
    }

    const currentTournamentPromise = Fetch.currentTournament();
    currentTournamentPromise.then(this.props.saveCurrentTournament);

    Promise.all([currentTournamentPromise, refreshAuthPromise])
        .finally(() => this.setState({loading: false}));
  }
}

export default connect(
    state => ({authenticated: state.auth, currentTournament: state.currentTournament}),
    {authLogin, authLogout, saveCurrentTournament})(App);

