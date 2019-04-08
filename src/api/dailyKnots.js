'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function queryDailyList (params) {
    return request({
        url: util.ajaxFront + 'POS/queryDailySettlement',
        method: 'get',
        params:  Object.assign({},params,{
            'POS': true
        })
    });
}

export default {
    queryDailyList
};
