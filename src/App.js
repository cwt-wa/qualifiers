import React from 'react';
import {Router} from 'director/build/director'
import Login from "./Login";
// import Login from "./Login";
// import DrawOpponents from "./DrawOpponents";

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {route: null}
  }

  render() {
    let content;

    if (this.state.route === '/login') {
      content = (<Login/>);
    } else {
      content = (
          <p>This is a tool to manage easy match-making for specifically for CWT qualifiers as it leverages the CWT 6
            API.</p>
      )
    }


    return (
        <>
          <div className="navbar">
            <div className="container">
              <ul>
                <li><a href="#/">Home</a></li>
                <li><a href="#/login">Login</a></li>
              </ul>
            </div>
          </div>

          <div className="container">
            <div className="content">
              <h1 className="no-wrap">CWT Qualifiers</h1>
              {content}
            </div>
          </div>
        </>
    );
  }

  componentDidMount() {
    console.log('mnt');

    Router({
      '/': () => this.setState({route: '/'}),
      '/login': () => this.setState({route: '/login'})
    }).init('/');
  }
}
