'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function queryDailyList (params) {
    return request({
        url: util.ajaxFront + 'XiMai/queryDailySettlement',
        method: 'get',
        params: params
    });
}

export default {
    queryDailyList
};
