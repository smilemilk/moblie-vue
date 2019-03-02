'use strict';

import request from '@/libs/request';
import util from '@/libs/util';



export function userDetail (params) {
    return request({
        url: util.ajaxFront + 'authority/merchantuser/getuser',
        method: 'get',
        params: params
    });
}


export function merchantId (params) {
    return request({
        url: util.ajaxFront + 'authority/merchantuser/queryUserByMerchantId',
        method: 'get',
        params: params
    });
}

export default {
    userDetail,
    merchantId
};
