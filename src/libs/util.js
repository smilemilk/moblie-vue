import axios from 'axios';
// import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';

let util = {};
util.title = function (title) {
    title = title || '微脉收银';
    window.document.title = title;
};

// 为了满足发布路径和接口地址不一致
if (process.env.NODE_ENV === "development") {
    util.ajaxFront = "";
} else if (process.env.NODE_ENV === "production") {
    util.ajaxFront = "https://www.weimaipay.com/";
}

util.ajax = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 15000
});

export default util;