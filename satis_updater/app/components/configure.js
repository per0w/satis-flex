const ignore = require('../../config/ignore');

const deepFlatten = require('../utils/deepflatten');

const {getProject, getRepository} = require('./bitbucketApi');

/**
 * Configure. Creating an array of repositories with a checking ignore list.
 *
 * @returns {Promise<Array>} - Array with repository.
 */
const configure = async () => {
    const filteredProjects = await getProject().then(result =>
        result.filter(element => !ignore.projects.includes(element)),
    );

    const filteredRepositories = deepFlatten(
        await Promise.all(filteredProjects.map(element => getRepository(element))),
    ).filter(element => !ignore.repo.includes(element));

    return filteredRepositories;
};

module.exports = configure;
