import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';

const resources = {
  en: {
    translation: en,
  },
  pt: {
    translation: pt,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // language to use
  fallbackLng: 'en', // fallback language if translation key is missing
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  debug: true, // enable this to see what's happening in the console
});

export default i18n;
