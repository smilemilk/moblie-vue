'use strict';

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    chainWebpack: (config) => {       // 新写法，不要outer了
        config.resolve.alias.set('_c', resolve('../src/components'))
    }
};
