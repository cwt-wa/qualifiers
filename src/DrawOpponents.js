import React from 'react';
import ApplicantsCheckboxList from "./ApplicantsCheckboxList";
import ApplicantsMatchMake from "./ApplicantsMatchMake";

export default class DrawOpponents extends React.Component {

    state = {drawnUsers: []};

    draw = noMatchUsers => {
        console.log('noMatchUsers', noMatchUsers);
        console.log('drawnUsers', this.state.drawnUsers);

        // todo perform the actual draw 
    };

    render() {
        if (!this.state.drawnUsers.length) {
            return <ApplicantsCheckboxList
                submit={drawnUsers => this.setState({drawnUsers})}/>;
        }

        return <ApplicantsMatchMake
            users={this.state.drawnUsers}
            submit={this.draw}/>;
    }
};
