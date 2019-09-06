import React from 'react';
import ApplicantsCheckboxList from "./ApplicantsCheckboxList";
import ApplicantsMatchMake from "./ApplicantsMatchMake";
import {shuffle} from "./util";
import {connect} from "react-redux";
import {draw} from "./redux/actions";
import toastr from 'toastr';

class DrawOpponents extends React.Component {

    state = {drawnUsers: []};

    draw = noMatchUsers => {
        const allUsers = [...shuffle(this.state.drawnUsers), ...shuffle(noMatchUsers)];
        const numberOfGames = allUsers.length / 2;
        const homeUsers = allUsers.slice(0, numberOfGames);
        const awayUsers = allUsers.slice(numberOfGames);

        const draw = new Array(numberOfGames).fill(null).map((_, idx) => ({
            homeUser: homeUsers[idx],
            awayUser: awayUsers[idx],
        }));

        // TODO Firebase Real-Time Database REST Call to Persist
        this.props.draw(draw);
        toastr.success('Applicants drawn');
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
}

export default connect(null, {draw})(DrawOpponents);
