import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MatchList from "../components/match/MatchList";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [activeMatches, setActiveMatches] = useState(0);
  const [totalBets, setTotalBets] = useState(0);

  useEffect(() => {
    // Fetch user balance
    const fetchBalance = () => {
      const storedBalance = localStorage.getItem("balance") || "0";
      setBalance(parseFloat(storedBalance));
    };

    // Listen for balance updates
    window.addEventListener("balanceUpdate", fetchBalance);
    fetchBalance();

    return () => {
      window.removeEventListener("balanceUpdate", fetchBalance);
    };
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-content">
          <div className="banner-text">
            <h1>🔥 Live Betting Arena</h1>
            <p>Welcome back, {user?.email || "Bettor"}! Place your bets and win big! 🚀</p>
          </div>
          <div className="banner-illustration">
            <div className="banner-icon">🎯</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats-banner">
          <div className="quick-stat">
            <span className="quick-stat-icon">💰</span>
            <div>
              <p className="quick-stat-label">Your Balance</p>
              <p className="quick-stat-value">₹{balance.toLocaleString()}</p>
            </div>
          </div>

          <div className="quick-stat divider"></div>

          <div className="quick-stat">
            <span className="quick-stat-icon">🎮</span>
            <div>
              <p className="quick-stat-label">Active Matches</p>
              <p className="quick-stat-value">{activeMatches}</p>
            </div>
          </div>

          <div className="quick-stat divider"></div>

          <div className="quick-stat">
            <span className="quick-stat-icon">📊</span>
            <div>
              <p className="quick-stat-label">Your Bets</p>
              <p className="quick-stat-value">{totalBets}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Section - Matches */}
        <div className="matches-section">
          <div className="section-header">
            <h2>⚽ Today's Matches</h2>
            <p>Place your bets on live matches and tournaments</p>
          </div>

          <MatchList onMatchCountChange={setActiveMatches} />
        </div>

        {/* Right Sidebar - Quick Actions */}
        <aside className="dashboard-sidebar">
          {/* Quick Actions Card */}
          <div className="sidebar-card">
            <h3>⚡ Quick Actions</h3>
            <p>Manage your account</p>

            <div className="action-buttons">
              <button
                className="action-btn wallet-btn"
                onClick={() => navigate("/wallet")}
              >
                <span className="action-icon">💰</span>
                <span className="action-label">Add Money</span>
              </button>

              <button
                className="action-btn history-btn"
                onClick={() => navigate("/history")}
              >
                <span className="action-icon">📜</span>
                <span className="action-label">Bet History</span>
              </button>

              <button
                className="action-btn profile-btn"
                onClick={() => navigate("/profile")}
              >
                <span className="action-icon">👤</span>
                <span className="action-label">My Profile</span>
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="sidebar-card info-card">
            <h3>📚 How to Bet</h3>

            <div className="info-steps">
              <div className="step">
                <div className="step-number">1</div>
                <p>Choose a match</p>
              </div>

              <div className="step">
                <div className="step-number">2</div>
                <p>Pick a team</p>
              </div>

              <div className="step">
                <div className="step-number">3</div>
                <p>Enter amount</p>
              </div>

              <div className="step">
                <div className="step-number">4</div>
                <p>Confirm bet</p>
              </div>
            </div>
          </div>

          {/* Promotions Card */}
          <div className="sidebar-card promo-card">
            <div className="promo-badge">🎁 Special Offer</div>
            <h3>50% Bonus</h3>
            <p>On your first deposit today!</p>
            <button className="promo-btn">Claim Now →</button>
          </div>

          {/* Featured Leagues */}
          <div className="sidebar-card leagues-card">
            <h3>🏆 Featured Leagues</h3>

            <div className="league-item">
              <span className="league-icon">🏏</span>
              <div className="league-info">
                <p className="league-name">IPL 2026</p>
                <p className="league-matches">12 matches</p>
              </div>
            </div>

            <div className="league-item">
              <span className="league-icon">⚽</span>
              <div className="league-info">
                <p className="league-name">Premier League</p>
                <p className="league-matches">15 matches</p>
              </div>
            </div>

            <div className="league-item">
              <span className="league-icon">🏀</span>
              <div className="league-info">
                <p className="league-name">NBA Finals</p>
                <p className="league-matches">8 matches</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;