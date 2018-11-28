import Vue from 'vue';
import App from './App';
import { router } from './router';

import '@/style/total.less';

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
