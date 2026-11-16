
import type { Candidate } from "../types/candidate";
import "./CandidateCard.css";

interface CandidateCardProps {
  candidate: Candidate;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export const CandidateCard = ({
  candidate,
  isFavorite,
  onToggleFavorite,
}: CandidateCardProps) => {
  return (
    <article className="candidate-card">
      <div className="candidate-card-header">
        <h3>{candidate.name}</h3>

        <button
          type="button"
          className="favorite-button"
          onClick={() => onToggleFavorite(candidate.id)}
          aria-label={
            isFavorite
              ? `Quitar a ${candidate.name} de favoritos`
              : `Agregar a ${candidate.name} a favoritos`
          }
          aria-pressed={isFavorite}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <p><strong>Profesión:</strong> {candidate.profession}</p>
      <p><strong>Ciudad:</strong> {candidate.city}</p>
      <p><strong>Correo:</strong> {candidate.email}</p>
      <p><strong>Teléfono:</strong> {candidate.phone}</p>
    </article>
  );
};
