import React from 'react';
import {Router} from 'director/build/director'
import Login from "./Login";
import {Provider} from 'react-redux'
import store from './redux/store'
import Navigation from "./Navigation";

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
          <p><strong>CWT Qualifiers</strong> is a tool to manage easy match-making
            specifically for CWT qualifiers as it leverages the CWT 6 API.</p>
      )
    }

    return (
        <Provider store={store}>
          <div className="navbar">
            <div className="container">
              <Navigation route={this.state.route}/>
            </div>
          </div>

          <div className="container">
            <div className="content">
              <h1 className="no-wrap">CWT Qualifiers</h1>
              {content}
            </div>
          </div>
        </Provider>
    );
  }

  componentDidMount() {
    Router({
      '/': () => this.setState({route: '/'}),
      '/login': () => this.setState({route: '/login'})
    }).init('/');
  }
}
