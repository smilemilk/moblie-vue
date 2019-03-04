import Vue from 'vue';
import App from './App';
import {router} from './router';

import '@/style/total.less';

import filter from '@/filters/filters';

import {
    Dialog,
    DatetimePicker,
    Popup,
    NumberKeyboard
} from 'vant';

Vue.use(Dialog);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(NumberKeyboard);

Vue.mixin(filter);
new Vue({
    router,
    el: '#app',
    render: h => h(App)
});
