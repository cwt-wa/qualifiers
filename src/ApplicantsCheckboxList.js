import React from 'react';
import Fetch from './fetch';
import CheckboxList from "./CheckboxList";

const toastr = require('toastr');

export default class ApplicantsCheckboxList extends React.Component {

    state = {applicants: [], drawnUsers: []};

    componentDidMount() {
        Fetch.applicants()
            .then(applicants => this.setState({applicants}))
            .catch(Fetch.defaultErrorHandler);
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

    render() {
        if (!this.state.applicants.length) {
            return <p>There are currently no applicants.</p>
        }

        return (
            <form onSubmit={this.submit}>
                <p>Select applicants to be drawn into qualifiers.</p>

                <CheckboxList
                    elems={this.state.applicants.map(a => a.applicant)}
                    onSelection={drawnUsers => this.setState({drawnUsers})}
                    displayKey="username"/>

                <input type="submit" value="Submit"/>
            </form>);
    }
};
