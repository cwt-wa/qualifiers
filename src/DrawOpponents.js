import React from 'react';
import ApplicantsCheckboxList from "./ApplicantsCheckboxList";
import ApplicantsMatchMake from "./ApplicantsMatchMake";

export default class DrawOpponents extends React.Component {

    state = {drawnUsers: []};

    usersSelected = drawnUsers => {
        this.setState({drawnUsers})
    };

    render() {
        if (!this.state.drawnUsers.length) {
            return <ApplicantsCheckboxList submit={this.usersSelected}/>;
        } else {
            return <ApplicantsMatchMake users={this.state.drawnUsers}/>;
        }
    }
};
