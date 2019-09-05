/* eslint-disable */
import Vue from 'vue'
import App from '@/App'
import i18n from '@/i18n'
import router from'@/router/router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'reset-css';
import '@/security'
import '@/service/alert'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

Vue.use(ElementUI);
Vue.config.productionTip = false;
locale.use(lang); // language for element ui

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
