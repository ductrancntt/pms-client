/* eslint-disable */
import Vue from 'vue'
import App from '@/App'
import i18n from '@/i18n'
import router from'@/router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'reset-css';
import '@/security'

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
