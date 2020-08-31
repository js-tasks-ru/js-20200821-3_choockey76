/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const array = path.split('.');

  return function getter(obj) {
      array.forEach((item) => {
        if (!obj) {
          return;
        }
          obj = obj[item];
      })
      
      return obj;
  }
}
