import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import alertMessage from './task2/file-one';
import { firstMessege, secondMessage } from './task2/file-two';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
alertMessage(firstMessege);
alertMessage(secondMessage);
