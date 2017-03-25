import mergeWith from 'lodash/mergeWith';
import union from 'lodash/union';

/**
 * @name mergeArray
 * @param existingArray
 * @param newArray
 */
const mergeArray = (existingArray, newArray) => union(existingArray, newArray);

/**
 * @name mergeObject
 * @param existingObject
 * @param newObject
 */
const mergeObject = (existingObject, newObject) => {
    return mergeWith({}, existingObject, newObject, (oldValue, newValue) => {
        if (Array.isArray(oldValue)) {
            return mergeArray(oldValue, newValue);
        }

        return undefined;
    });
};

export default mergeObject;
