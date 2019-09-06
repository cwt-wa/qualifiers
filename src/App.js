import React from 'react';
import {Router} from 'director/build/director'
import Navigation from "./Navigation";
import Content from "./Content";
import {connect} from "react-redux";
import {authLogin} from "./redux/actions";

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

    const token = window.localStorage.getItem('token');
    if (token != null) this.props.authLogin(token);
  }
}

export default connect(state => ({authenticated: state.auth}), {authLogin})(App);

