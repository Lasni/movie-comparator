// debounce wrapper function for limiting api calls
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    // if typing keep clearing timeoutId so setTimeout callback never fires
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      // apply ...args to the callback function
      func.apply(null, args);
    }, delay);
  };
};
