#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const createSatisJson = require('./app/components/createSatisJson');

const run = async () => {
    await createSatisJson();
    await exec('docker cp config/satis.json satis:/satis/').then(() =>
        console.log('Сopying... satis.json - Done!'),
    );
    await exec(
        'docker exec satis php -f /satis/bin/satis build /satis/satis.json /www/satis/html > log.txt',
        {maxBuffer: 1024 * 500},
    ).then(() => console.log('Builded!'));
};
run();
