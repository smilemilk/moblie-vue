'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function userDetail (params) {
    return request({
        url: util.ajaxFront + 'authority/merchantuser/getuser',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}

export function merchantId (params) {
    return request({
        url: util.ajaxFront + 'authority/merchantuser/queryUserByMerchantId',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}

export function merchantUser (params) {
    return request({
        url: util.ajaxFront + 'merchantuser',
        method: 'get',
        params:  Object.assign({},params,{
            'XiMai': true
        })
    });
}

export default {
    userDetail,
    merchantId,
    merchantUser // 商户
};
