'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function getToken (params) {
    return request({
        url: util.ajaxFront + 'sec/rsa',
        method: 'get',
        params:  Object.assign({},params,{
            'POS': true
        })
    });
}

export function login (params) {
    return request({
        url: util.ajaxFront + 'user/mechantlogin',
        method: 'post',
        data:  Object.assign({},params,{
            'POS': true
        }),
        params:  Object.assign({},params,{
            'POS': true
        })
    });
}

export function getUser (params) {
    return request({
        url: util.ajaxFront + 'merchantuser',
        method: 'get',
        params:  Object.assign({},params,{
            'POS': true
        })
    })
}

export function loginOut (params) {
    return request({
        url: util.ajaxFront + 'user/mechantlogout',
        method: 'post',
        data:  Object.assign({},params,{
            'POS': true
        }),
        params:  Object.assign({},params,{
            'POS': true
        })
    })
}

export default {
    getToken,
    login,
    getUser,
    loginOut
};
