import merge from './merge';
// Theming
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {
    indigo500
} from 'material-ui/styles/colors';

const MuiTheme = getMuiTheme(merge(lightBaseTheme, {
}));

export default MuiTheme;
