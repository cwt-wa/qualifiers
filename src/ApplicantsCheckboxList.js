import React from 'react';
import './App.css';

export default class ApplicantsCheckboxList extends React.Component {

    state = {applicants: [], errorLoadingUsers: false};

    componentDidMount() {
        fetch('http://localhost:9000/api/tournament/current/applications')
            .then(res => res.json())
            .then(applicants => applicants.sort((a, b) => a.applicant.username.localeCompare(b.applicant.username)))
            .then(applicants => this.setState({applicants}))
            .catch(reason => this.setState({errorLoadingUsers: true}));
    }

    render() {
        if (this.state.errorLoadingUsers) {
            return (
                <p className="error">
                    Could not load applicants.
                </p>
            );
        } else {
            if (!this.state.applicants.length) {
                return <p>There are no applicants currently.</p>
            } else {
                return (
                    <div>
                        {this.state.applicants.map(a =>
                            <div key={a.id}>
                                <label>
                                    <input name="applicant" type="checkbox"/>{a.applicant.username}
                                </label>
                            </div>)}
                    </div>
                );
            }
        }
    }
};
