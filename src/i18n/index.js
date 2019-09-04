import Vue from 'vue';
import I18n from 'vue-i18n';
import en from '@/i18n/en.json';
import vi from '@/i18n/vi.json';

Vue.use(I18n);

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
