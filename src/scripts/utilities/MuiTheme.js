import merge from './merge';
// Theming
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const MuiTheme = getMuiTheme(merge(lightBaseTheme, {
    palette: {
        primary1Color: '#ab83ad'
    }
}));

export default MuiTheme;
