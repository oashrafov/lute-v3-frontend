import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enPage from "../../locales/en/page.json";
import enForm from "../../locales/en/form.json";

export const resources = {
  en: {
    page: enPage,
    form: enForm,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
});

export default i18next;
