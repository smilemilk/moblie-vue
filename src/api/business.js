'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function getTradeSumAmount (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryTradeOrderSum',
        method: 'get',
        params: params
    });
}

export function getTrade (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryTradeOrder',
        method: 'get',
        params: params
    });
}

export function getOrderDetail (params) {
    return request({
        url: util.ajaxFront + 'merchant/tradeJour/orderDetail',
        method: 'get',
        params: params
    });
}

export function refund (params) {
    return request({
        url: util.ajaxFront + 'XiMai/refund',
        method: 'get',
        params: params
    });
}

export default {
    getTradeSumAmount,
    getTrade,
    getOrderDetail,
    refund
};
