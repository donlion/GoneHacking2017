import request from 'axios';

const URL = `https://sammenhold.webshaolin.com`;

/**
 * @name Get
 * @name Request wrapper for request
 * @param url
 * @param options
 */
export function get(url, options) {
    options = Object.assign({}, options, {
        url: URL+url,
        method: 'get'
    });

    return request(options);
}

/**
 * @name Post
 * @param url
 * @param data
 * @param options
 */
export function post(url, data, options={}) {
    options = Object.assign({}, options, {
        url: URL+url,
        method: 'post',
        data: data
    });

    return request(options);
}

/**
 * Export all methods
 */
export default {
    get,
    post
};
