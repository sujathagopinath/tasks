import 'react-i18next';
import en from '../i18n/en/translations.json'
import de from '../i18n/ge/translations.json'

declare module 'react-i18next' {
    interface CustomTypeOptions {
        defaultNS: 'en';
        resources: {
            ns1: typeof en;
            ns2: typeof de;
        };
    }
};