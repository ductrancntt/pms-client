import Vue from 'vue';
import I18n from 'vue-i18n';
import en from '@/i18n/en/en';
import vi from '@/i18n/vi/vi';
import axios from "axios";

Vue.use(I18n);
let currentLanguage = "en/en";
axios.get('i18n/' + currentLanguage + '.json').then(res => {
    console.log(res);
    if (res.data) {
        this.i18n.setLocaleMessage(currentLanguage, res.data);
        this.i18n.locale = currentLanguage;
        this.store.commit('currentLanguage', currentLanguage);
    }
});

let currentLang = "en";
const i18n = new I18n({
    locale: currentLang,
    messages: {
        en: en,
        vi: vi
    },
    fallbackLocale: "en"
});

i18n.changeLang = (lang) => {
    currentLang = lang;
    i18n.locale = lang;
}
i18n.getCurrentLang = () => {
    return currentLang;
}
export default i18n;
