import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import getTranslations from "./services/translations.service";

const resources = {
  fr: {
    translation: null,
  },
  en: {
    translation: null,
  },
  es: {
    translation: null,
  },
};

const resourcesLoaded = Promise.all([
  getTranslations("fr").then(
    (translation) => (resources.fr.translation = translation)
  ),
  getTranslations("en").then(
    (translation) => (resources.en.translation = translation)
  ),
  getTranslations("es").then(
    (translation) => (resources.es.translation = translation)
  ),
]);

i18n.use(initReactI18next).use(LanguageDetector).init({
  fallbackLng: "fr",
  resources: resources,
  debug: true,
});

export default resourcesLoaded;
