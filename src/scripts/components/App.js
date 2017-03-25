import React, {
    Component
} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Components
import AppBar from 'material-ui/AppBar';
import View from './views/index';
// Theming
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MuiTheme from '../utilities/MuiTheme';

injectTapEventPlugin();


/**
 * @name App
 */
export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={MuiTheme}>
                <div>
                    <AppBar
                        showMenuIconButton={false}
                        title="CancerMate" />

                    <div className="content">
                        <View />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
