/* eslint-disable */
import '@/assets/styles/app.scss';
import Vue from 'vue';
import App from '@/App';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import i18n from '@/i18n';
import router from "@/router";
import '@/security';
import VueDraggable from 'vue-draggable'
import utils from "@/utils";
import VueMoment from 'vue-moment';
import CKEditor from '@ckeditor/ckeditor5-vue';
import '@/components/GlobalComponentRegister';

Vue.use( CKEditor );
Vue.use(VueDraggable)
Vue.use(ElementUI);
Vue.use(VueMoment);
Vue.config.productionTip = false;
locale.use(lang); // language for element ui

Vue.prototype.$utils = utils;

export const bus = new Vue();

new Vue({
    router,
    i18n,
    render: h => h(App),
}).$mount('#app')
