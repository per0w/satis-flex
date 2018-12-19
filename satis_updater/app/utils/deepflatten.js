/**
 * DeepFlatten. Make array with subarrays flatten.
 *
 * @param {Array} arr - Array with subarrays.
 * @returns {Array} - Flatten array doesn't contain subarrays.
 */
const deepFlatten = arr => [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));

module.exports = deepFlatten;
