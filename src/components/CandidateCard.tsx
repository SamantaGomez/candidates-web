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
  const experienceText =
    candidate.yearsOfExperience === 0
      ? "Sin experiencia"
      : candidate.yearsOfExperience === 1
        ? "1 año de experiencia"
        : `${candidate.yearsOfExperience} años de experiencia`;

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

      <p><strong>Ciudad:</strong> {candidate.city}</p>
      <p><strong>Correo:</strong> {candidate.email}</p>
      <p><strong>Teléfono:</strong> {candidate.phone}</p>
      <p><strong>Experiencia:</strong> {experienceText}</p>

      <p>
        <strong>Habilidades:</strong>{" "}
        {candidate.skills.length > 0
          ? candidate.skills.join(", ")
          : "Sin habilidades registradas"}
      </p>
    </article>
  );
};