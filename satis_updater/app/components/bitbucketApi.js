const getRequest = require('./request');

const {bitbucket} = require('../../config/config');

/**
 * If composer json exists, check for file composer.json.
 *
 * @param {string} project - Keys porject (GUSA).
 * @param {string} slug - Name repository (elastic-bundle).
 * @param {string} limit - The number of results returned.
 * @returns {Promise<boolean>} - Is contains composer file.
 */
const ifComposerJsonExists = async (project, slug, limit = 1000) => {
    const request = await getRequest(
        `${bitbucket.url}${bitbucket.api}/${project}/repos/${slug}/browse?limit=${limit}`,
    );
    const existsComposer = Object.values(request.data.children.values).map(
        value => value.path.name,
    );
    return existsComposer.indexOf('composer.json') !== -1;
};

/**
 * Get project.
 *
 * @param {string} limit - The number of results returned.
 * @returns {Promise<Array>} - Array with projects.
 */
const getProject = async (limit = 1000) => {
    const request = await getRequest(`${bitbucket.url}${bitbucket.api}?limit=${limit}`);
    return Object.values(request.data.values).map(value => value.key);
};

/**
 * Get repository,and also checks on exists file composer.json.
 *
 * @param {string} project - Keys porject (GUSA).
 * @param {string} limit - The number of results returned.
 * @returns {Promise<Array>} - Array with repository.
 */
const getRepository = async (project, limit = 1000) => {
    const request = await getRequest(
        `${bitbucket.url}${bitbucket.api}/${project}/repos?limit=${limit}`,
    );
    const slugs = Object.values(request.data.values).map(value => value.slug);

    const repositories = await Promise.all(
        slugs.map(async slug => {
            const filter = await ifComposerJsonExists(project, slug);
            return filter ? `${bitbucket.url}/scm/${project}/${slug}.git` : null;
        }),
    );
    return repositories.filter(item => item);
};

module.exports = {
    getRepository,
    getProject,
};
