
import { useState } from "react";
import { CandidateList } from "../components/CandidateList";
import { candidates } from "../data/candidates";
import "./CandidatesPage.css";

export const CandidatesPage = () => {
  // Estado para almacenar el texto de búsqueda.
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Estado para almacenar los IDs de los favoritos.
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  // Agrega o elimina un candidato de favoritos.
  const toggleFavorite = (id: number) => {
    setFavoriteIds((previousFavorites) =>
      previousFavorites.includes(id)
        ? previousFavorites.filter((favoriteId) => favoriteId !== id)
        : [...previousFavorites, id]
    );
  };

  // Normaliza el texto para realizar la búsqueda.
  const normalizedTerm = searchTerm.trim().toLowerCase();

  // Filtra candidatos por nombre o ciudad.
  const filteredCandidates = candidates.filter((candidate) =>
    `${candidate.name} ${candidate.city}`
      .toLowerCase()
      .includes(normalizedTerm)
  );

  return (
    <section className="candidates-page">
      <div className="candidates-page-header">
        <h2>Candidatos</h2>

        <p className="candidates-page-count">
          {filteredCandidates.length}{" "}
          {filteredCandidates.length === 1
            ? "resultado"
            : "resultados"}
        </p>
      </div>

      <input
        type="search"
        className="candidates-search"
        placeholder="Buscar por nombre o ciudad..."
        aria-label="Buscar candidatos por nombre o ciudad"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
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
    </section>
  );
};
