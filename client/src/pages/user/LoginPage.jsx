import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || "/profile";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <main className="auth-page-wrapper">
      <section className="auth-box-layout">
        <div className="auth-left-panel auth-left-login">
          <span className="auth-chip">Welcome back</span>
          <h1>Sign in to continue shopping smarter.</h1>
          <p>
            Access your cart, orders, wishlist, saved addresses, and account
            settings in one place.
          </p>

          <div className="auth-benefits">
            <div className="auth-benefit-item">
              <span>🛒</span>
              <p>Track your cart and checkout faster</p>
            </div>

            <div className="auth-benefit-item">
              <span>📦</span>
              <p>View your latest orders and delivery updates</p>
            </div>

            <div className="auth-benefit-item">
              <span>💙</span>
              <p>Save products to wishlist and buy later</p>
            </div>
          </div>
        </div>

        <div className="auth-right-panel">
          <div className="auth-form-container">
            <div className="auth-form-top">
              <h2>Login</h2>
              <p>Enter your account details below.</p>
            </div>

            <form className="auth-modern-form" onSubmit={handleSubmit}>
              <div className="auth-field-group">
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="auth-field-group">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="auth-row">
                <label className="auth-check">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password" className="auth-link-text">
                  Forgot password?
                </Link>
              </div>

              {error ? <p className="auth-error-box">{error}</p> : null}

              <button
                type="submit"
                className="auth-main-button"
                disabled={submitting}
              >
                {submitting ? "Signing in..." : "Login"}
              </button>
            </form>

            <div className="auth-line-divider">
              <span>or continue with</span>
            </div>

            <div className="auth-social-grid">
              <button type="button" className="auth-social-button">
                Google
              </button>
              <button type="button" className="auth-social-button">
                Apple
              </button>
            </div>

            <p className="auth-switch-line">
              Don’t have an account?{" "}
              <Link to="/register" className="auth-link-text">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;