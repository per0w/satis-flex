require('dotenv').config({path: '../.env'});

const config = {
    satis: {
        path: './config/satis.json',
    },
    bitbucket: {
        url: 'https://bitbucket-server',
        username: process.env.username,
        password: process.env.password,
        api: '/rest/api/1.0/projects',
    },
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};

module.exports = config;
