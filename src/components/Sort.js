import React from "react";
import { useTranslation } from "react-i18next";

export default function Sort({ sortBy, setSortBy }) {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: "1rem", textAlign: "center" }}>
      <label>
        {t("sort_by")}:
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="name">{t("name") || "Name"}</option>
          <option value="origin">{t("origin")}</option>
        </select>
      </label>
    </div>
  );
}

