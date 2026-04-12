import { useEffect, useState } from "react";
import { userAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const [balance, setBalance] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  // 🔥 decode role from token
  let role = "";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch (err) {
      console.log(err);
    }
  }

  const fetchWallet = async () => {
    try {
      const res = await userAPI.get("/getwallet");
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWallet();
    window.addEventListener("walletUpdate", fetchWallet);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("walletUpdate", fetchWallet);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* LOGO */}
        <div
          className="logo"
          onClick={() => handleNavClick("/")}
          role="button"
          tabIndex={0}
        >
          <span className="logo-icon">🔥</span>
          <span className="logo-text">BetX Pro</span>
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav-desktop">
          <button
            className="nav-button"
            onClick={() => handleNavClick("/")}
          >
            Home
          </button>
          <button
            className="nav-button"
            onClick={() => handleNavClick("/history")}
          >
            My Bets
          </button>

          {/* 🔥 ADMIN BUTTON */}
          {role === "admin" && (
            <button
              className="nav-button admin-button"
              onClick={() => handleNavClick("/admin")}
            >
              ⚙️ Admin
            </button>
          )}

          <div className="wallet-display">
            <span className="wallet-icon">💰</span>
            <span className="wallet-amount">₹{balance.toLocaleString()}</span>
          </div>

          <button
            className="logout-button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE NAV */}
      {isMenuOpen && (
        <nav className="nav-mobile">
          <button
            className="mobile-nav-button"
            onClick={() => handleNavClick("/")}
          >
            Home
          </button>
          <button
            className="mobile-nav-button"
            onClick={() => handleNavClick("/history")}
          >
            My Bets
          </button>

          {role === "admin" && (
            <button
              className="mobile-nav-button admin-button"
              onClick={() => handleNavClick("/admin")}
            >
              ⚙️ Admin
            </button>
          )}

          <div className="wallet-display-mobile">
            <span className="wallet-icon">💰</span>
            <span className="wallet-amount">₹{balance.toLocaleString()}</span>
          </div>

          <button
            className="logout-button mobile-logout"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </nav>
      )}
    </header>
  );
}

export default Header;