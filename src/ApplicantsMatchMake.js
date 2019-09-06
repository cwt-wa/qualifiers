import React from 'react';

export default class ApplicantsMatchMake extends React.Component {

  render() {
      return this.props.users.map(u => u.username);
  }
};
