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

export default {
    createOrder
};
