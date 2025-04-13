import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <div style={{ position: "relative" }}>
      <div className="lang-switcher">
        <LanguageSwitcher />
      </div>
      <h1>{t("title")}</h1>
    </div>
  );
}
