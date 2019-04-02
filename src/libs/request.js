import axios from 'axios';
import {jsCookie} from '@/libs/auth';
import util from '@/libs/util';

// 创建axios实例
const service = axios.create({
    baseURL:
        'ximai/',
    // util.ajax.baseURL, // api的base_url
    timeout: 50000, // 请求超时时间
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    responseType: 'json',
    withCredentials: false // 是否允许带cookie这些
});

//service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * 通过response自定义code来标示请求状态
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response;
        if (res.status !== 200) {
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
            //     iView.Notice.info('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            //         confirmButtonText: '重新登录',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         store.dispatch('LogOut').then(() => {
            //             location.reload(); // 为了重新实例化vue-router对象 避免bug
            //         });
            //     });
            // }
            // eslint-disable-next-line
            return Promise.reject('error');
        } else {
            return response.data;
        }
    },
    error => {
        return Promise.reject(error ? error : '请求为成功');
    }
);

export default service;
