'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function createOrder (params) {
    return request({
        url: util.ajaxFront + 'XiMai/createOrder',
        method: 'get',
        params: params
    });
}

export function queryOrder (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryPayOrder',
        method: 'get',
        params: params
    });
}

export function cancelOrder (params) {
    return request({
        url: util.ajaxFront + 'XiMai/cancelOrder',
        method: 'get',
        params: params
    });
}

export default {
    createOrder,
    queryOrder,
    cancelOrder
};
