'use strict';

const path = require('path');
const webpackDevConfig = require('./build/webpack.dev.config');
const merge = require('webpack-merge');


const autoprefixer = require('autoprefixer');// rem
const pxtorem = require('postcss-pxtorem');  // rem
const themeConfig = require('./theme/index');

    function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = merge(webpackDevConfig, {
    outputDir: '../dist',
    baseUrl: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
    lintOnSave: true,
    chainWebpack: (config)=>{
        config
            .resolve
            .alias
            .set('@', resolve('src'))
            .set('assets',resolve('src/assets'))
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [ // rem
                    autoprefixer(),
                    pxtorem({
                        rootValue: 16,
                        propList: [
                            '*',
                            '!line*',
                            '!border*'], // 对属性
                        // selectorBlackList:['.van-'], // 对class
                        minPixelValue: 9,
                        unitPrecision: 3,
                    }),
                ]
            },
            less: {
                modifyVars: themeConfig
            }
        }
    }
});
