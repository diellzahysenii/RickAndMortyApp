import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import Filters from "./Filters";
import Sort from "./Sort";

export default function CharacterList() {
  const [page] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        status: statusFilter || undefined,
        species: speciesFilter || undefined,
      },
    },
  });

  const sortedCharacters = data?.characters?.results
    ? [...data.characters.results].sort((a, b) => {
        const valA = sortBy === "name" ? a.name : a.origin.name;
        const valB = sortBy === "name" ? b.name : b.origin.name;
        return valA.localeCompare(valB);
      })
    : [];

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (loading) return <p>Loading characters...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Characters</h2>
      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
      />
      <Sort sortBy={sortBy} setSortBy={setSortBy} />

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {sortedCharacters.map((char) => (
          <div
            key={char.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              margin: "1rem",
              width: "200px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <img src={char.image} alt={char.name} width="100%" />
            <h3>{char.name}</h3>
            <p>Status: {formatStatus(char.status)}</p>
            <p>Species: {char.species}</p>
            <p>Gender: {char.gender}</p>
            <p>Origin: {char.origin.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
