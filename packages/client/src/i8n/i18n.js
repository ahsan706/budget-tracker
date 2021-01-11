import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { isProduction } from '../config/constants';
i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      fallbackLng: 'en',
      debug: !isProduction,
      lng: 'en',
      getAsync: false,
      initImmediate: true,
      interpolation: {
        escapeValue: false // not needed for react as it escapes by default
      },
      react: {
        wait: true,
        useSuspense: false
      }
    },
    () => {
      console.error('Bol');
    }
  );
