'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function getRJOrder (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryRJOrder',
        method: 'get',
        params: params
    });
}

export default {
    getRJOrder
};
