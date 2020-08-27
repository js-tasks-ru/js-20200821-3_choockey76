/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const object = {}

  Object.entries(obj).forEach((item) => {
    if (fields.includes(item[0])) {
      object[item[0]] = item[1];
    }
  })

  return object;
};
