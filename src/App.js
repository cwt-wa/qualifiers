import React from 'react';
import {Router} from 'director/build/director'
import Navigation from "./Navigation";
import Content from "./Content";
import {connect} from "react-redux";
import {authLogin, authLogout} from "./redux/actions";
import Fetch from "./fetch";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {route: null}
  }

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
              <Content route={this.state.route}/>
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
    if (refreshToken != null) {
      Fetch.refreshAuth(refreshToken)
          .then(freshTokens => this.props.authLogin(freshTokens.idToken, freshTokens.refreshToken))
          .catch(() => this.props.authLogout());
    }
  }
}

export default connect(state => ({authenticated: state.auth}), {authLogin, authLogout})(App);

