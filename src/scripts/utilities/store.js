import merge from './merge';

let store = {};
export const setStore = newStore => {
    store = merge(store, newStore);
    updatedStore(store);
};

let subscribers = [];
export const subscribe = fn => subscribers = subscribers.concat(fn);

const updatedStore = store => {
    subscribers.forEach(subscriber => {
        subscriber(store);
    });
};

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
