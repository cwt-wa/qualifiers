import React from 'react';
import Fetch from './fetch';

export default class ApplicantsCheckboxList extends React.Component {

    state = {applicants: []};

    componentDidMount() {
        Fetch.applicants()
            .then(applicants => this.setState({applicants}));
    }

    render() {
        if (!this.state.applicants.length) {
            return <p>There are currently no applicants.</p>
        }

        return (
            <>
                <p>Select applicants to be drawn into qualifiers.</p>

                {this.state.applicants.map(a =>
                    <div key={a.id}>
                        <input name="applicant" id={'applicant' + a.id} type="checkbox"/>
                        <label className="label-inline" htmlFor={'applicant' + a.id}>{a.applicant.username}</label>
                    </div>)}
            </>);
    }
};
