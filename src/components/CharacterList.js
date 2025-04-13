import React, { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import Filters from "./Filters";
import Sort from "./Sort";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: {
      page,
      filter: {
        status: statusFilter || undefined,
        species: speciesFilter || undefined,
      },
    },
    notifyOnNetworkStatusChange: true,
  });

  // Ref to last element for infinite scroll trigger
  const observer = useRef();
  const lastCharacterRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.characters?.info?.next) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, data]
  );

  // Add new characters to the list when data changes
  useEffect(() => {
    if (data?.characters?.results) {
      if (page === 1) {
        setCharacters(data.characters.results);
      } else {
        setCharacters((prev) => [...prev, ...data.characters.results]);
      }
    }
  }, [data, page]);

  // Reset characters when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, speciesFilter]);

  const sortedCharacters = [...characters].sort((a, b) => {
    const valA = sortBy === "name" ? a.name : a.origin.name;
    const valB = sortBy === "name" ? b.name : b.origin.name;
    return valA.localeCompare(valB);
  });

  const formatStatus = (status) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

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
        {sortedCharacters.map((char, index) => {
          const isLast = index === sortedCharacters.length - 1;
          return (
            <div
              key={char.id}
              ref={isLast ? lastCharacterRef : null}
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
          );
        })}
      </div>

      {loading && <p>Loading more characters...</p>}
    </div>
  );
}
