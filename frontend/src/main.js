import Vue from 'vue'
import App from './App.vue'

import FluenceApi from '../FluenceApi.js';

Vue.config.productionTip = false
FluenceApi.execute('SHOW TABLES');

new Vue({
  render: h => h(App),
}).$mount('#app')