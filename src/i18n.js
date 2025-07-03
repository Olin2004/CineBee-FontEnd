import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/eng/translation.json';
import vi from './locales/vie/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: 'vi', //language default
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
});

export default i18n;
