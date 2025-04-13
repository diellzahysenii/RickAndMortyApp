import React from "react";
import { useTranslation } from "react-i18next";

export default function Filters({
  statusFilter,
  setStatusFilter,
  speciesFilter,
  setSpeciesFilter,
}) {
  const { t } = useTranslation();

  return (
    <div style={{ marginBottom: "1rem", textAlign: "center" }}>
      <label style={{ marginRight: "1rem" }}>
        {t("filter_by_status")}:
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="">{t("status")}</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">{t("unknown")}</option>
        </select>
      </label>

      <label style={{ marginLeft: "1rem" }}>
        {t("filter_by_species")}:
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="">{t("species")}</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Humanoid">Humanoid</option>
        </select>
      </label>
    </div>
  );
}
