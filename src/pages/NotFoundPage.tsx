import { Link } from "react-router";
import "./NotFoundPage.css";

export const NotFoundPage = () => {
  return (
    <section className="not-found-page">
      <h2>404</h2>

      <h3>Página no encontrada</h3>

      <p>
        La dirección que busca no existe.
      </p>

      <Link to="/candidates" className="not-found-link">
        ← Volver a los candidatos
      </Link>
    </section>
  );
};