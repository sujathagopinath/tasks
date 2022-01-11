import i18n from 'i18next';
import Backend from 'i18next-xhr-backend'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'ta'];

i18n
  .use(Backend)
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    detection: {
      checkWhitelist: true
    },
    debug: true,
  resources: {
    en: {
      translations: require('./en/translations.json')
    },
    ta: {
      translations: require('./ta/translations.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});
i18n.languages = ['en', 'ta'];
export default i18n
