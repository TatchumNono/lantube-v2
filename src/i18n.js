import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EnglishTranslation from './locales/en/translation.json';
import FrenchStranslation from './locales/fr/translation.json';

const resources = {
  en: {
    translation: EnglishTranslation
  },
  fr: {
    translation: FrenchStranslation
  }
};



i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    debug:true,
    resources,
    lng: "fr",
    fallbackLng: 'fr',

    keySeparator: true, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;