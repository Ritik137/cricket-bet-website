import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.email || !form.password) {
      setError("❌ Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("❌ Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser(form);
      const token = res.data.token || res.data?.data?.token;

      if (!token) {
        throw new Error("No token returned from login");
      }

      localStorage.setItem("token", token);
      
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", form.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      login(token);

      // Success animation
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "❌ Login failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    // Placeholder for social login
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="login-wrapper">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-brand">
          <div className="brand-content">
            <div className="brand-logo">🔥</div>
            <h1>BetX Pro</h1>
            <p>The Ultimate Betting Platform</p>

            <div className="brand-features">
              <div className="feature">
                <span className="feature-icon">⚡</span>
                <span>Fast & Secure</span>
              </div>
              <div className="feature">
                <span className="feature-icon">🏆</span>
                <span>Win Big</span>
              </div>
              <div className="feature">
                <span className="feature-icon">💰</span>
                <span>Easy Withdrawals</span>
              </div>
            </div>

            <div className="brand-testimonial">
              <p>"Best betting platform ever! Won ₹50,000+ 🎉"</p>
              <small>- Rahul, Delhi</small>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-form">
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to your account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
                <button
                  className="error-close"
                  onClick={() => setError("")}
                >
                  ✕
                </button>
              </div>
            )}

            <form onSubmit={handleLogin}>
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <span className="input-icon">✉️</span>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔐</span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-actions">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-mini"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="button-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="signup-link">
              Don't have an account?
              <Link to="/signup"> Create one</Link>
            </div>

            {/* Divider */}
            <div className="divider">
              <span>Or continue with</span>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <button
                type="button"
                className="social-btn google"
                onClick={() => handleSocialLogin("google")}
                disabled={loading}
              >
                <span>G</span>
              </button>
              <button
                type="button"
                className="social-btn facebook"
                onClick={() => handleSocialLogin("facebook")}
                disabled={loading}
              >
                <span>f</span>
              </button>
              <button
                type="button"
                className="social-btn twitter"
                onClick={() => handleSocialLogin("twitter")}
                disabled={loading}
              >
                <span>𝕏</span>
              </button>
            </div>

            {/* Footer */}
            <div className="form-footer">
              <p>By signing in, you agree to our</p>
              <div className="footer-links">
                <a href="#">Terms of Service</a>
                <span>•</span>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;