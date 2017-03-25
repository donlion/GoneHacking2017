import {browserHistory} from 'react-router';
import isClient from './isClient';

/**
 * @name goto
 * @param path
 * @returns {*}
 */
export default function goto(path) {
    if (!isClient) {
        return null;
    }

    return browserHistory.push(path);
}
