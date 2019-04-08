'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function modPassword (params) {
    return request({
        url: util.ajaxFront + 'user/loginpwd/reset',
        method: 'post',
        params:  Object.assign({},params,{
            'POS': true
        }),
        data:  Object.assign({},params,{
            'POS': true
        })
    });
}

export default {
    modPassword
};
