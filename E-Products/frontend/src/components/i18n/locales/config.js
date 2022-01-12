import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
  fallbackLng: 'en',
  debug:true,
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

