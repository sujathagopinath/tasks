import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'ta',
  resources: {
    en: {
      translations: require('./locales/en/translations.json')
    },
    ta: {
      translations: require('./locales/ta/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});
i18n.languages = ['en', 'ta'];
export default i18n
