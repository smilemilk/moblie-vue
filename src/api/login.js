'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function getToken (params) {
    return request({
        url: util.ajaxFront + 'sec/rsa',
        method: 'get',
        params: params
    });
}

export function login (params) {
    return request({
        url: util.ajaxFront + 'user/mechantlogin',
        method: 'post',
        data: params,
        params: params
    });
}

export function getUser (params) {
    return request({
        url: util.ajaxFront + 'merchantuser',
        method: 'get',
        params: params
    })
}

export function loginOut (params) {
    return request({
        url: util.ajaxFront + 'user/mechantlogout',
        method: 'post',
        data: params,
        params: params
    })
}

export default {
    getToken,
    login,
    getUser,
    loginOut
};
