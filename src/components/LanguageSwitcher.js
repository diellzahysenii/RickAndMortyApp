import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <footer>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("de")}>DE</button>
    </footer>
  );
}
