import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'


Vue.use(Vuex);
import FluenceApi from '../FluenceApi.js';
import store from './store/';

Vue.config.productionTip = false;

(async () => {
  console.log(await FluenceApi.getTasks());
})()

new Vue({
  render: h => h(App),
  store: new Vuex.Store(store)
}).$mount('#app')