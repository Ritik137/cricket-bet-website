import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  // Validation
  const validateForm = () => {
    if (!form.name.trim()) {
      setError("❌ Please enter your name");
      return false;
    }

    if (form.name.trim().length < 2) {
      setError("❌ Name must be at least 2 characters");
      return false;
    }

    if (!form.email.trim()) {
      setError("❌ Please enter your email");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("❌ Please enter a valid email");
      return false;
    }

    if (!form.password) {
      setError("❌ Please enter a password");
      return false;
    }

    if (form.password.length < 6) {
      setError("❌ Password must be at least 6 characters");
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("❌ Passwords do not match");
      return false;
    }

    if (!agreeTerms) {
      setError("❌ Please agree to Terms & Conditions");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      
      alert(res.data.msg || "✅ Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "❌ Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Register with ${provider}`);
  };

  return (
    <div className="register-wrapper">
      {/* Background Animation */}
      <div className="background-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="register-container">
        {/* Left Side - Benefits */}
        <div className="register-benefits">
          <div className="benefits-content">
            <div className="benefits-logo">🚀</div>
            <h1>Join BetX Pro</h1>
            <p>Start your betting journey today!</p>

            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <div>
                  <p className="benefit-title">Instant Payouts</p>
                  <p className="benefit-desc">Get your winnings in seconds</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">🔒</span>
                <div>
                  <p className="benefit-title">100% Secure</p>
                  <p className="benefit-desc">Your data is encrypted & safe</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">🎁</span>
                <div>
                  <p className="benefit-title">Welcome Bonus</p>
                  <p className="benefit-desc">50% bonus on first deposit</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">📱</span>
                <div>
                  <p className="benefit-title">Mobile Ready</p>
                  <p className="benefit-desc">Bet anytime, anywhere</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="benefits-stats">
              <div className="stat">
                <p className="stat-value">50K+</p>
                <p className="stat-label">Users</p>
              </div>
              <div className="stat">
                <p className="stat-value">₹10Cr+</p>
                <p className="stat-label">Paid Out</p>
              </div>
              <div className="stat">
                <p className="stat-value">4.8★</p>
                <p className="stat-label">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="register-form-container">
          <div className="register-form">
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Join millions of bettors</p>
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

            <form onSubmit={handleRegister}>
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    disabled={loading}
                  />
                </div>
              </div>

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
                    placeholder="Create a strong password"
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
                <div className="password-hint">
                  At least 6 characters
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrapper">
                  <span className="input-icon">🔐</span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={loading}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  disabled={loading}
                />
                <span>
                  I agree to the
                  <a href="#"> Terms of Service</a> and
                  <a href="#"> Privacy Policy</a>
                </span>
              </label>

              {/* Register Button */}
              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-mini"></span>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="button-arrow">→</span>
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="login-link">
              Already have an account?
              <Link to="/login"> Sign in</Link>
            </div>

            {/* Divider */}
            <div className="divider">
              <span>Or sign up with</span>
            </div>

            {/* Social Register */}
            <div className="social-register">
              <button
                type="button"
                className="social-btn google"
                onClick={() => handleSocialRegister("google")}
                disabled={loading}
              >
                <span>G</span>
              </button>
              <button
                type="button"
                className="social-btn facebook"
                onClick={() => handleSocialRegister("facebook")}
                disabled={loading}
              >
                <span>f</span>
              </button>
              <button
                type="button"
                className="social-btn twitter"
                onClick={() => handleSocialRegister("twitter")}
                disabled={loading}
              >
                <span>𝕏</span>
              </button>
            </div>

            {/* Footer */}
            <div className="form-footer">
              <p>By signing up, you confirm that you are 18+ years old</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;