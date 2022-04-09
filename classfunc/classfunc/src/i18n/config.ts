import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../i18n/en/translations.json";
import de from "../i18n/ge/translations.json"

export const defaultNS = 'ns1'
export const resources = {
    en: {
        en,
        de,
    },
} as const;

i18n.use(initReactI18next).init({
    lng: 'en',
    ns: ['en', 'de'],
    defaultNS,
    resources,
});



