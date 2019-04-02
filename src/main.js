import Vue from 'vue';
import App from './App';
import {router} from './router';
import store from './store';

import '@/style/total.less';

import filter from '@/filters/filters';

import {
    NavBar,
    Dialog,
    DatetimePicker,
    Popup,
    NumberKeyboard,
    PullRefresh,
    Loading
} from 'vant';

Vue.use(NavBar);
Vue.use(Dialog);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(NumberKeyboard);
Vue.use(PullRefresh);
Vue.use(Loading);

Vue.mixin(filter);
new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});
