import React from 'react';
import Fetch from './fetch';

export default class ApplicantsCheckboxList extends React.Component {

    state = {applicants: [], errorLoadingUsers: false};

    componentDidMount() {
        Fetch.applicants()
            .then(applicants => this.setState({applicants}));
    }

    render() {
        if (!this.state.applicants.length) {
            return <p>There are currently no applicants.</p>
        }

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
};
