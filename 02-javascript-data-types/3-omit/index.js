/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export const omit = (obj, ...fields) => {
  const object = {};

  Object.entries(obj).forEach((item) => {
    if (!fields.includes(item[0])) {
      object[item[0]] = item[1];
    }
  })

  return object;
};
