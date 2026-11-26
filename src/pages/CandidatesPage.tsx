import { useEffect, useState } from "react";
import type { Candidate } from "../types/candidate";
import { CandidateList } from "../components/CandidateList";
import { getCandidates } from "../services/candidateService";
import "./CandidatesPage.css";

export const CandidatesPage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const data = await getCandidates();
        setCandidates(data);
      } catch {
        setErrorMessage(
          "No se pudieron cargar los candidatos. Intente de nuevo más tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadCandidates();
  }, []);

  const toggleFavorite = (id: number) => {
    setFavoriteIds((previousFavorites) =>
      previousFavorites.includes(id)
        ? previousFavorites.filter(
            (favoriteId) => favoriteId !== id
          )
        : [...previousFavorites, id]
    );
  };

  const normalizedTerm = searchTerm.trim().toLowerCase();

  const filteredCandidates = candidates.filter((candidate) =>
    `${candidate.name} ${candidate.city}`
      .toLowerCase()
      .includes(normalizedTerm)
  );

  return (
    <section className="candidates-page">
      <div className="candidates-page-header">
        <h2>Candidatos</h2>

        {!isLoading && !errorMessage && (
          <p className="candidates-page-count">
            {filteredCandidates.length}{" "}
            {filteredCandidates.length === 1
              ? "resultado"
              : "resultados"}
          </p>
        )}
      </div>

      {isLoading && (
        <p className="candidates-page-loading" role="status">
          Cargando candidatos...
        </p>
      )}

      {!isLoading && errorMessage && (
        <p className="candidates-page-error" role="alert">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && (
        <>
          <input
            type="search"
            className="candidates-search"
            placeholder="Buscar por nombre o ciudad..."
            aria-label="Buscar candidatos por nombre o ciudad"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          <p className="candidates-favorites-count">
            Favoritos seleccionados: {favoriteIds.length}
          </p>

          {filteredCandidates.length === 0 ? (
            <p className="candidates-page-empty">
              No se encontraron candidatos con ese término.
            </p>
          ) : (
            <CandidateList
              candidates={filteredCandidates}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </>
      )}
    </section>
  );
};