import React from 'react';

export default class ErrorBoundary extends React.Component {

    state = {};

    componentDidCatch(error, errorInfo) {
        console.log('An error occurred');
        console.log(error);
        console.log(errorInfo);
        this.setState({error: 'An error occurred'})
    }

    render() {
        return this.state.error != null
            ? <p color="red">{this.state.error}</p>
            : this.props.children;
    }
};
