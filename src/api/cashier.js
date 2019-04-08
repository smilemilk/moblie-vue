'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function createOrder (params) {
    return request({
        url: util.ajaxFront + 'POS/createOrder',
        method: 'get',
        params:  Object.assign({},params,{
            'POS': true
        })
    });
}

export function queryOrder (params) {
    return request({
        url: util.ajaxFront + 'POS/queryPayOrder',
        method: 'get',
        params:  Object.assign({},params,{
            'POS': true
        })
    });
}

export function cancelOrder (params) {
    return request({
        url: util.ajaxFront + 'POS/cancelOrder',
        method: 'get',
        params:  Object.assign({},params,{
            'POS': true
        })
    });
}

export default {
    createOrder,
    queryOrder,
    cancelOrder
};
