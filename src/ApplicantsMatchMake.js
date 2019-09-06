import React from 'react';
import CheckboxList from "./CheckboxList";

export default class ApplicantsMatchMake extends React.Component {

  submit = e => {
    e.preventDefault();
    this.props.submit(this.state.noMatchUsers);
  };

  render() {
    return (
        <form onSubmit={this.submit}>
          <p>
            Select applicants who should not play against each other.<br/>
            Once you submit, matches are made and there’s no going back.
          </p>

          <CheckboxList
              elems={this.props.users}
              onSelection={noMatchUsers => this.setState({noMatchUsers})}
              displayKey="username"/>

          <input type="submit" value="Submit"/>
        </form>
    );
  }
};
