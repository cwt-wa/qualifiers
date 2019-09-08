import React from 'react';
import ApplicantsCheckboxList from "./ApplicantsCheckboxList";
import ApplicantsMatchMake from "./ApplicantsMatchMake";
import {shuffle} from "./util";
import {connect} from "react-redux";
import {draw} from "./redux/actions";
import Fetch from './fetch';
import toastr from 'toastr';

class DrawOpponents extends React.Component {

    state = {drawnUsers: []};

    draw = noMatchUsers => {
        const drawnUsersWithoutNoMatchUsers = this.state.drawnUsers.filter(u => noMatchUsers.indexOf(u) === -1);
        const allUsers = [...shuffle(drawnUsersWithoutNoMatchUsers), ...shuffle(noMatchUsers)];
        const numberOfGames = allUsers.length / 2;
        const homeUsers = allUsers.slice(0, numberOfGames);
        const awayUsers = allUsers.slice(numberOfGames);

        const draw = new Array(numberOfGames).fill(null).map((_, idx) => ({
            homeUser: {id: homeUsers[idx].id, username: homeUsers[idx].username},
            awayUser: {id: awayUsers[idx].id, username: awayUsers[idx].username},
        }));

        Fetch.saveDraw(new Date(this.props.currentTournament.created).getUTCFullYear(), draw)
            .then(() => {
                this.props.draw(draw);
                toastr.success('Applicants drawn');
            });
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

export default connect(state => ({currentTournament: state.currentTournament}), {draw})(DrawOpponents);
