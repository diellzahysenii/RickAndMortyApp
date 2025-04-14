import React from "react";

export default function Error({ message }) {
  return (
    <div style={{ color: "#e53935", textAlign: "center", padding: "2rem" }}>
      ❌ Error: {message}
    </div>
  );
}
