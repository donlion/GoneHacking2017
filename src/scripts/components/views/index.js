import React, {Component} from 'react';
import {
    StaticRouter as Router,
    Route
} from 'react-router-dom';
// Components
import Home from './Home';
import SignUp from './SignUp';

const context = {};

export default class View extends Component {

    render() {
        return (
            <Router
                location={'/'}
                context={context}>
                <Route
                    path={'/'}
                    component={SignUp} />
            </Router>
        );
    }
}
