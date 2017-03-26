import merge from './merge';

/**
 * @name store
 * @type {{signedIn: boolean, lifeLines: [*]}}
 */
let store = {
    signedIn: false,
    lifeLines: {}
};

/**
 * @name setStore
 * @param newStore
 */
export const setStore = newStore => {
    (global.requestAnimationFrame || function(){})(() => {
        store = merge(store, newStore);
        updatedStore(store);
    });
};

/**
 * @name subscribers
 * @type {Array}
 */
let subscribers = {};

/**
 * @name subscribe
 * @param fn
 * @returns {*}
 */
export const subscribe = (name, fn) => {
    subscribers.name = fn;
    return fn(store);
};

export const unsubscribe = name => {
    delete subscribers.name;
};

/**
 * @name updatedStore
 * @param store
 */
const updatedStore = store => {
    Object.keys(subscribers)
        .forEach(key => {
            let subscriber = subscribers[key];
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
    subscribe,
    unsubscribe
};
