'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function getTradeSumAmount (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryTradeOrderSum',
        method: 'get',
        params: Object.assign({},params,{
            'XiMai': true
        })
    });
}

export function getTrade (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryTradeOrder',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}

export function getRefund (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryRefundOrder',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}
export function getPay (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryPayOrder',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}

// export function getOrderDetail (params) {
//     return request({
//         url: util.ajaxFront + 'merchant/tradeJour/orderDetail',
//         method: 'get',
//         params:  Object.assign({},params,{
//             'XiMai': true
//         })
//     });
// }

export function cancel(params) {
    return request({
        url: util.ajaxFront + 'XiMai/cancelOrder',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}

export function refund (params) {
    return request({
        url: util.ajaxFront + 'XiMai/refund',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}

export default {
    getTradeSumAmount,
    getTrade,
    getRefund,
    getPay,
    // getOrderDetail,
    cancel,
    refund
};
