/**
 *
 * @param {string} key key to be used to local storage
 * @param {string / number / boolean / object / any[]} value values to be saved
 * @returns {string}
 */
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return `Data was saved with the key ${key}`;
}
//savetolocalstorage
//setItem: kreere key navn + værdi
//Stringify: konvertere javascript værdi til JSON værdi
// ----------------------------------------------------------
/**
 *
 * @param {string / number / boolean / object / any[]} key key to be read from localStorage
 * @returns
 */
function readfromlocalstorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
//readfromlocalstorage
//parse: turns JSON værdi til JS object så det igen kan læses i js
// ----------------------------------------------------------
/**
 *
 * @param {string / number / boolean / object / any[]} key key to be deleted from localStorage
 * @returns
 */
function deleteFromLocalStorage(key) {
  localStorage.removeItem(key);
  return `The element width ${key} was deleted.`;
}
//deletefromlocalstorage
//removeItem: sletter item med key,value pair hvis det eksistere

//function til at slette specifikt item fra array fra localStorage
function removeItemFromLocalStorage(key, itemToRemove) {
  // Get the current array from localStorage
  let storedArray = readfromlocalstorage(key) || [];
  // Filter out the item to remove
  let updatedArray = storedArray.filter((item) => item !== itemToRemove);
  // Save the updated array back to localStorage
  saveToLocalStorage(key, updatedArray);
  return `Item ${itemToRemove} was removed from ${key}`;
}
