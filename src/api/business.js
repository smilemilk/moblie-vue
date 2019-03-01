'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function getTradeList (params) {
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

export default {
    getTradeList,
    getTrade
};
