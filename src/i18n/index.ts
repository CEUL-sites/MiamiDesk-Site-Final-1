// TODO: native Madrid editor review — all Spanish copy in es.json must be
// reviewed by a native Castilian speaker before production use.

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng:
    typeof window !== 'undefined' && window.location.pathname.startsWith('/es')
      ? 'es'
      : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
