import merge from './merge';

/**
 * @name store
 * @type {{signedIn: boolean, lifeLines: [*]}}
 */
let store = {
    signedIn: false,
    lifeLines: [
        {
            name: 'Cooking',
            helper: 'Walter White Jr.'
        },
        {
            name: 'Cooking',
            helper: 'Skyler White'
        },
        {
            name: 'Cleaning',
            helper: 'Skyler White'
        }
    ]
};

/**
 * @name setStore
 * @param newStore
 */
export const setStore = newStore => {
    store = merge(store, newStore);
    updatedStore(store);
};

/**
 * @name subscribers
 * @type {Array}
 */
let subscribers = [];

/**
 * @name subscribe
 * @param fn
 * @returns {*}
 */
export const subscribe = fn => {
    subscribers = subscribers.concat(fn);
    return fn(store);
};

/**
 * @name updatedStore
 * @param store
 */
const updatedStore = store => {
    subscribers.forEach(subscriber => {
        subscriber(store);
    });
};

/**
 * @name getStore
 * @type {{getStore}}
 */
export const getStore = {
    get getStore() {
        return store;
    }
};

export default {
    store: getStore.getStore,
    setStore,
    subscribe
};
