import React, {
    Component,
    PropTypes
} from 'react';
import {
    Router,
    Route,
    browserHistory
} from 'react-router';
import isClient from '../../utilities/isClient';
import goto from '../../utilities/goto';
// Components
import AppBar from 'material-ui/AppBar';
// Views
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class View extends Component {
    get getViews() {
        if (!isClient) {
            return null;
        }

        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    title={(
                        <a
                            href="#"
                            onClick={e => {
                                e.preventDefault();
                                return goto('/');
                            }}
                            className="logo logo--header">
                            <img src={'/static/logo.png'}/>
                        </a>
                    )} />

                <div className="content">
                    <Router history={browserHistory}>
                        <div>
                            <Route
                                path={'/signup'}
                                component={SignUp} />
                            <Route
                                path={'/'}
                                component={SignIn} />
                        </div>
                    </Router>
                </div>
            </div>
        );
    }

    render() {
        const {getViews} = this;

        return getViews;
    }
}
