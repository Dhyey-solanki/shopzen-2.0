import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      await register({ name, email, password, confirmPassword });
      navigate("/profile", { replace: true });
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to register");
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <main className="auth-page">
      <section className="auth-wrapper">
        <div className="auth-left auth-left-register">
          <span className="auth-tag">Join ShopZen</span>
          <h1>Create your account</h1>
          <p>
            Start shopping faster, save products to wishlist, track your orders,
            and manage your profile in one place.
          </p>

          <div className="auth-features">
            <div className="auth-feature-card">
              <span>⚡</span>
              <p>Quick checkout with saved details</p>
            </div>

            <div className="auth-feature-card">
              <span>📦</span>
              <p>Easy order tracking and history</p>
            </div>

            <div className="auth-feature-card">
              <span>💙</span>
              <p>Save favorite products for later</p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-box">
            <div className="auth-heading">
              <h2>Create account</h2>
              <p>Fill in your details to get started.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="auth-input-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create password"
                  required
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {error ? <p className="auth-error-message">{error}</p> : null}

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={submitting}
              >
                {submitting ? "Creating account..." : "Register"}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-social-buttons">
              <button type="button" className="auth-social-btn">
                Google
              </button>
              <button type="button" className="auth-social-btn">
                Apple
              </button>
            </div>

            <p className="auth-switch-text">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;