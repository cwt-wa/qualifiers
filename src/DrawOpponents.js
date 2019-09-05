import React from 'react';
import ApplicantsCheckboxList from "./ApplicantsCheckboxList";
import ErrorBoundary from "./ErrorBoundary";

export default class DrawOpponents extends React.Component {

    render() {
        return <ErrorBoundary><ApplicantsCheckboxList/></ErrorBoundary>
    }
};
