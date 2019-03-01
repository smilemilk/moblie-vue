import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
    {
        path: '*',
        redirect: '/goods'
    },
    {
        name: 'user',
        component: () => import('./view/user'),
        meta: {
            title: '会员中心'
        }
    },
    {
        name: 'cart',
        component: () => import('./view/cart'),
        meta: {
            title: '购物车'
        }
    },
    {
        name: 'goods',
        component: () => import('./view/goods'),
        meta: {
            title: '商品详情'
        }
    },
    {
        name: 'incomeList',
        component: () => import('./view/wallet/incomeList'),
        meta: {
            title: '商品详情'
        }
    },
    {
        name: 'account',
        component: () => import('./view/wallet/account'),
        meta: {
            title: '我的钱包'
        }
    },
    {
        name: 'login',
        component: () => import('./view/login/index'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'home',
        component: () => import('./view/home/index'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'cashier',
        component: () => import('./view/cashier/index'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'cashierCode',
        component: () => import('./view/cashier/code'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'cashierSuccess',
        component: () => import('./view/cashier/cashier-success'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'cashierFailure',
        component: () => import('./view/cashier/cashier-failure'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'business',
        component: () => import('./view/business/index'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'businessDetail',
        component: () => import('./view/business/business-detail'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'daily',
        component: () => import('./view/dailyKnots/index'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'set',
        component: () => import('./view/set/index'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'passwordModify',
        component: () => import('./view/set/password-modify'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'passwordModifySuccess',
        component: () => import('./view/set/password-modify-success'),
        meta: {
            title: '登录'
        }
    },
    {
        name: 'networkError',
        component: () => import('./view/error/networkError'),
        meta: {
            title: '登录'
        }
    }
];

// add route path
routes.forEach(route => {
    route.path = route.path || '/' + (route.name || '');
});

const router = new Router({routes});

router.beforeEach((to, from, next) => {
    const title = to.meta && to.meta.title;
    if (title) {
        document.title = title;
    }
    next();
});

export {
    router
};
