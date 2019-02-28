'use strict';

import Cookies from 'js-cookie';

const CookieEvent = function () {
    this.get = function (item) {
        return Cookies.get(item) ? Cookies.get(item) : '';
    };
    this.getJson = function (item) {
        return Cookies.getJSON(item) ? Cookies.getJSON(item) : '';
    };
    this.set = function (item, val) {
        return Cookies.set(item, val);
    };
    this.remove = function (item) {
        return Cookies.remove(item);
    };
};

export const jsCookie = new CookieEvent();
