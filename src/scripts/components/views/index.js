import React, {Component} from 'react';
import {
    Router,
    Route,
    browserHistory
} from 'react-router';
import isClient from '../../utilities/isClient';
// Components
import SignIn from './SignIn';
import SignUp from './SignUp';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class View extends Component {

    get getViews() {

        console.log({isClient});

        if (!isClient) {
            return null;
        }

        return (
            <Router history={browserHistory}>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    <Route
                        path={'/signup'}
                        component={SignUp} />
                    <Route
                        path={'/'}
                        component={SignIn} />
                </ReactCSSTransitionGroup>
            </Router>
        );
    }

    render() {
        const {getViews} = this;

        return getViews;
    }
}
