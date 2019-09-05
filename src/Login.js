import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  submit = e => {
    console.log(e);
  };

  render() {
    return (
        <form onSubmit={this.submit}>
          <div>
            <label form="username">Username</label>
            <input type="text" name="username" id="username" value={this.state.username}
                   onChange={this.onChange}/>
          </div>
          <div>
            <label form="passwords">Password</label>
            <input type="password" name="password" id="password" value={this.state.paswords}
                   onChange={this.onChange}/>
          </div>
          <div>
            <input type="submit" value="Sign in"/>
          </div>
        </form>
    );
  }
};
