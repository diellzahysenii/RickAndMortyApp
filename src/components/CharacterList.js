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

  useEffect(() => {
    if (data?.characters?.results) {
      if (page === 1) {
        setCharacters(data.characters.results);
      } else {
        setCharacters((prev) => [...prev, ...data.characters.results]);
      }
    }
  }, [data, page]);

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
    <div>
      <h2>{t("title")}</h2>

      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
      />
      <Sort sortBy={sortBy} setSortBy={setSortBy} />

      <div className="character-grid">
        {sortedCharacters.map((char, index) => {
          const isLast = index === sortedCharacters.length - 1;

          return (
            <div
              key={char.id}
              ref={isLast ? lastCharacterRef : null}
              className="character-card"
            >
              <img src={char.image} alt={char.name} />
              <h3>{char.name}</h3>
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
