import React from "react";

export default function Filters({
  statusFilter,
  setStatusFilter,
  speciesFilter,
  setSpeciesFilter,
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Filter by Status:
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </label>

      <label style={{ marginLeft: "1rem" }}>
        Filter by Species:
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Robot">Robot</option>
          <option value="Humanoid">Humanoid</option>
        </select>
      </label>
    </div>
  );
}
