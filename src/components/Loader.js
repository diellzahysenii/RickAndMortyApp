import React from "react";

export default function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "2rem", fontSize: "18px" }}>
      <span role="status" aria-live="polite">
        🔄 Loading...
      </span>
    </div>
  );
}
