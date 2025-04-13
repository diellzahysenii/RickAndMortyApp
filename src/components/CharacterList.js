import React, { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import Filters from "./Filters";
import Sort from "./Sort";
import { useTranslation } from "react-i18next";

export default function CharacterList() {
  const { t } = useTranslation();

  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
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
    notifyOnNetworkStatusChange: true,
  });

  // Infinite Scroll Observer
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

  // Update character list
  useEffect(() => {
    if (data?.characters?.results) {
      if (page === 1) {
        setCharacters(data.characters.results);
      } else {
        setCharacters((prev) => [...prev, ...data.characters.results]);
      }
    }
  }, [data, page]);

  // Reset when filters change
  useEffect(() => {
    setPage(1);
  }, [statusFilter, speciesFilter]);

  const sortedCharacters = [...characters].sort((a, b) => {
    const valA = sortBy === "name" ? a.name : a.origin.name;
    const valB = sortBy === "name" ? b.name : b.origin.name;
    return valA.localeCompare(valB);
  });

  const formatStatus = (status) => {
    if (!status) return t("unknown") || "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center" }}>{t("title")}</h2>

      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
      />
      <Sort sortBy={sortBy} setSortBy={setSortBy} />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {sortedCharacters.map((char, index) => {
          const isLast = index === sortedCharacters.length - 1;

          return (
            <div
              key={char.id}
              ref={isLast ? lastCharacterRef : null}
              style={{
                border: "1px solid #ddd",
                backgroundColor: "#fff",
                padding: "1rem",
                margin: "1rem",
                width: "220px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
              }}
            >
              <img
                src={char.image}
                alt={char.name}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <h3 style={{ marginTop: "0.5rem" }}>{char.name}</h3>
              <p>{t("status")}: {formatStatus(char.status)}</p>
              <p>{t("species")}: {char.species}</p>
              <p>{t("gender")}: {char.gender}</p>
              <p>{t("origin")}: {char.origin.name}</p>
            </div>
          );
        })}
      </div>

      {loading && <p style={{ textAlign: "center" }}>{t("loading") || "Loading more characters..."}</p>}
    </div>
  );
}
