import React from "react";

export default function Sort({ sortBy, setSortBy }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Sort by:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="origin">Origin</option>
        </select>
      </label>
    </div>
  );
}
