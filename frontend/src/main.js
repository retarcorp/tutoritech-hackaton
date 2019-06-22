import Vue from 'vue'
import App from './App.vue'

import FluenceApi from '../FluenceApi.js';

Vue.config.productionTip = false;

(async () => {
  console.log(await FluenceApi.getTasks());
})()

new Vue({
  render: h => h(App),
}).$mount('#app')