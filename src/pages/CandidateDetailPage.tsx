import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { isAxiosError } from "axios";
import type { Candidate } from "../types/candidate";
import { getCandidateById } from "../services/candidateService";
import "./CandidateDetailPage.css";

export const CandidateDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [candidate, setCandidate] =
    useState<Candidate | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCandidate = async () => {
      setIsLoading(true);
      setErrorMessage("");
      setCandidate(null);

      try {
        if (!id) {
          setErrorMessage("El candidato que busca no existe.");
          return;
        }

        const data = await getCandidateById(id);

        if (isActive) {
          setCandidate(data);
        }
      } catch (error) {
        if (!isActive) return;

        if (
          isAxiosError(error) &&
          (error.response?.status === 404 ||
            error.response?.status === 400)
        ) {
          setErrorMessage(
            "El candidato que busca no existe."
          );
        } else {
          setErrorMessage(
            "No se pudieron cargar los candidatos. Intente de nuevo más tarde."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadCandidate();

    return () => {
      isActive = false;
    };
  }, [id]);

  const experienceText = candidate
    ? candidate.yearsOfExperience === 0
      ? "Sin experiencia"
      : candidate.yearsOfExperience === 1
        ? "1 año de experiencia"
        : `${candidate.yearsOfExperience} años de experiencia`
    : "";

  return (
    <section className="candidate-detail-page">
      <Link to="/candidates" className="back-link">
        ← Volver a los candidatos
      </Link>

      {isLoading && (
        <p className="candidate-detail-loading" role="status">
          Cargando candidato...
        </p>
      )}

      {!isLoading && errorMessage && (
        <p className="candidate-detail-error" role="alert">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && candidate && (
        <article className="candidate-detail-card">
          <h2>{candidate.name}</h2>

          <p><strong>Ciudad:</strong> {candidate.city}</p>
          <p><strong>Correo:</strong> {candidate.email}</p>
          <p><strong>Teléfono:</strong> {candidate.phone}</p>
          <p><strong>Experiencia:</strong> {experienceText}</p>

          <h3>Habilidades</h3>

          {candidate.skills.length > 0 ? (
            <ul className="candidate-skills">
              {candidate.skills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="skill-tag"
                >
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p>Sin habilidades registradas</p>
          )}
        </article>
      )}
    </section>
  );
};