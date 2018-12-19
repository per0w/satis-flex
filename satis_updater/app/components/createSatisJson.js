const fs = require('fs');

const configure = require('./configure');

const {satis} = require('../../config/config');

/**
 * Building and create satis.json file for satis server.
 */
const createSatisJson = async () => {
    const filteredRepositories = await configure();
    const repositories = filteredRepositories.reduce(
        (done, repository) =>
            done.concat({
                type: 'git',
                url: repository,
            }),
        [],
    );
    const config = {
        name: 'Satis repository',
        homepage: 'https://satis-server',
        repositories,
        'require-all': true,
        'require-dependencies': false,
        archive: {
            directory: 'dist',
            format: 'tar',
        },
    };

    fs.writeFileSync(satis.path, JSON.stringify(config, null, 2));
};

module.exports = createSatisJson;
