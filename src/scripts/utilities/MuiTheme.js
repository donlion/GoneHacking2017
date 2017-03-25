import merge from './merge';
// Theming
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const MuiTheme = getMuiTheme(merge(lightBaseTheme, {
    palette: {
        primary1Color: '#e71422'
    },
    appBar: {
        textColor: '#e71422',
        color: '#ffffff'
    }
}));

export default MuiTheme;
