import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <section className="section-group not-found-page">
        <h2>404 — Page not found</h2>
        <p>Sorry, we couldn't find the page you were looking for.</p>
        <Link to="/" className="button button-primary">
          Return home
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
