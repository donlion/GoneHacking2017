import React, {
    Component
} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import merge from '../utilities/merge';
import goto from '../utilities/goto';
import isClient from '../utilities/isClient';
import {setStateHandler} from '../utilities/store';
import store from '../utilities/store';
// Components
import AppBar from 'material-ui/AppBar';
// Views
import {
    Router,
    Route,
    browserHistory
} from 'react-router';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import LifeLine from './views/LifeLine';
// Theming
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiTheme from '../utilities/MuiTheme';

injectTapEventPlugin();


/**
 * @name App
 */
export default class App extends Component {
    constructor() {
        super();

        this.state = {};
    }

    componentDidMount() {
        const {updateState} = this;

        store.subscribe('app', newState => this.setState(newState));
    }

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

                                return global.history.go(-1);
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
                                component={SignUp}/>
                            <Route
                                path={'/dashboard/:lifeline'}
                                component={LifeLine} />
                            <Route
                                path={'/dashboard'}
                                component={Dashboard}/>
                            <Route
                                path={'/'}
                                component={SignIn}/>
                        </div>
                    </Router>
                </div>
            </div>
        );
    }

    render() {
        const {getViews} = this;

        return (
            <MuiThemeProvider muiTheme={MuiTheme}>
                {getViews}
            </MuiThemeProvider>
        );
    }
}
