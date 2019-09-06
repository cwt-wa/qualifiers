import React from 'react';
import Fetch from './fetch';

const toastr = require('toastr');

export default class ApplicantsCheckboxList extends React.Component {

    state = {applicants: [], drawnUsers: []};

    componentDidMount() {
        Fetch.applicants()
            .then(applicants => this.setState({applicants}));
    }

    submit = e => {
        e.preventDefault();

        if (this.state.drawnUsers.length % 2 !== 0) {
            toastr.error('You may only select an even number of applicants.');
            return;
        } else if (this.state.drawnUsers.length < 2) {
            toastr.error('No users drawn.');
            return;
        }

        this.props.submit(this.state.drawnUsers);
    };

    toggleCheck = (add, userId) => {
        this.setState(state => {
            if (add) state.drawnUsers.push(state.applicants.find(a => a.applicant.id === userId).applicant);
            if (!add) state.drawnUsers.splice(state.drawnUsers.findIndex(dA => dA.id === userId), 1);

            return {drawnUsers: state.drawnUsers};
        });
    };

    isDrawn = (userId) => {
        return this.state.drawnUsers.find(dA => dA.id === userId) != null;
    };

    render() {
        if (!this.state.applicants.length) {
            return <p>There are currently no applicants.</p>
        }

        return (
            <form onSubmit={this.submit}>
                <p>Select applicants to be drawn into qualifiers.</p>

                {this.state.applicants.map(a =>
                    <div key={a.id}>
                        <input name="applicant" id={'applicant' + a.id} type="checkbox"
                               checked={this.isDrawn(a.applicant.id)} onChange={e => this.toggleCheck(e.target.checked, a.applicant.id)}/>
                        <label className="label-inline" htmlFor={'applicant' + a.id}>{a.applicant.username} {this.isDrawn(a.applicant.id)}</label>
                    </div>)}

                <input type="submit" value="Submit"/>
            </form>);
    }
};
