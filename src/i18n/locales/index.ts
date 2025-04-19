/* src/i18n/locales/i18n.ts */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptPT from './pt-PT.json';
import ptBR from './pt-BR.json';
import enUS from './en-US.json';
import frFR from './fr-FR.json';
import esES from './es-ES.json';

i18n.use(initReactI18next).init({
  resources: {
    'pt-PT': { translation: ptPT },
    'pt-BR': { translation: ptBR },
    'en-US': { translation: enUS },
    'fr-FR': { translation: frFR },
    'es-ES': { translation: esES }
  },
  lng: 'en-US', 
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
