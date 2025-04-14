import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CHARACTERS } from "../graphql/queries";
import Filters from "./Filters";
import Sort from "./Sort";
import Loader from "./Loader";
import Error from "./Error";
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

  // Infinite scroll using scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (
        scrollTop + clientHeight >= scrollHeight - 300 &&
        data?.characters?.info?.next &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, loading]);

  // Update character list when data changes
  useEffect(() => {
    if (data?.characters?.results) {
      if (page === 1) {
        setCharacters(data.characters.results);
      } else {
        setCharacters((prev) => [...prev, ...data.characters.results]);
      }
    }
  }, [data, page]);

  // Reset page when filters change
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

  // Show full screen loader on first page load
  if (loading && page === 1) return <Loader />;

  if (error) return <Error message={error.message} />;

  return (
    <div>
      <Filters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        speciesFilter={speciesFilter}
        setSpeciesFilter={setSpeciesFilter}
      />
      <Sort sortBy={sortBy} setSortBy={setSortBy} />

      <div className="character-grid">
        {sortedCharacters.map((char) => (
          <div key={char.id} className="character-card">
            <img src={char.image} alt={char.name} />
            <h3>{char.name}</h3>
            <p>{t("status")}: {formatStatus(char.status)}</p>
            <p>{t("species")}: {char.species}</p>
            <p>{t("gender")}: {char.gender}</p>
            <p>{t("origin")}: {char.origin.name}</p>
          </div>
        ))}
      </div>

      {loading && page > 1 && <Loader />}
    </div>
  );
}
