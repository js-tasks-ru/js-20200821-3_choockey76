/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const sortedArr = arr.concat();
  return sortedArr.sort((a, b) => {
    switch (param) {
    case 'desc':
      return b.localeCompare(a);
    case 'asc':
      return a.localeCompare(b, 'en', {caseFirst: "upper"});
    default:
      console.log('Укажите корректное значение или пропустите второй параметр');
      break;
    }
  });
}
