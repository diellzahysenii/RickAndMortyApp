import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation(); //this provides access to changeLanguage

  return (
    <div style={{
      position: "absolute",
      top: "1rem",
      right: "1rem",
      display: "flex",
      gap: "0.5rem"
    }}>
      <button onClick={() => i18n.changeLanguage("en")}>EN</button>
      <button onClick={() => i18n.changeLanguage("de")}>DE</button>
    </div>
  );
}
