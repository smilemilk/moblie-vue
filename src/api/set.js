'use strict';

import request from '@/libs/request';
import util from '@/libs/util';

export function modPassword (params) {
    return request({
        url: util.ajaxFront + 'user/loginpwd/reset',
        method: 'post',
        params: params,
        data: params
    });
}

export default {
    modPassword
};
