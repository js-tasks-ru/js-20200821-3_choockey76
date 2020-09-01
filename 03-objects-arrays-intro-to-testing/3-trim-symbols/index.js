/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let includesCount = 0;
  let formattedString = '';

  if (size === 0) {
    return ''
  }


  if (!size) {
    return string;
  }

  
  for (let i=0; i < string.length; i++) {
    if (string[i] === string[i+1]) {
      includesCount++;
    } else {
      includesCount = 0;
    }

    if (includesCount < size) {
      formattedString+=string[i];
    }
  }

  return formattedString
}
