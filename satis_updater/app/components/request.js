const axios = require('axios');

const {bitbucket, headers} = require('../../config/config');

const {username, password} = bitbucket;

/**
 * Get request.
 *
 * @param {string} url - Request params.
 * @returns {Promise<Object>} - Returned a response object.
 */
const getRequest = async url => {
    const get = await axios
        .get(url, {headers, auth: {username, password}})
        .catch(
            err => `Status: ${err.response.status} Message: ${err.response.data.errors[0].message}`,
        );

    return get;
};

module.exports = getRequest;
