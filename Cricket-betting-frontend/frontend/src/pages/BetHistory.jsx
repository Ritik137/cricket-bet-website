import { useEffect, useState } from "react";
import { getMyBets } from "../services/betService";
import "./BetHistory.css";

const BetHistory = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    won: 0,
    lost: 0,
    pending: 0,
    totalWinnings: 0,
  });

  useEffect(() => {
    fetchBets();
  }, []);

  const fetchBets = async () => {
    try {
      setLoading(true);
      const res = await getMyBets();
      setBets(res.data);
      calculateStats(res.data);
    } catch (err) {
      console.error("Error fetching bets:", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (betsList) => {
    const stats = {
      total: betsList.length,
      won: betsList.filter((b) => b.status === "won").length,
      lost: betsList.filter((b) => b.status === "lost").length,
      pending: betsList.filter((b) => b.status === "pending").length,
      totalWinnings: betsList
        .filter((b) => b.status === "won")
        .reduce((sum, b) => sum + (b.winnings || 0), 0),
    };
    setStats(stats);
  };

  const filteredBets = bets.filter((bet) => {
    if (filter === "all") return true;
    return bet.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "won":
        return "#00d9a3";
      case "lost":
        return "#ff4757";
      case "pending":
        return "#ffa502";
      default:
        return "#b0b0d9";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "won":
        return "🎉";
      case "lost":
        return "❌";
      case "pending":
        return "⏳";
      default:
        return "📊";
    }
  };

  return (
    <div className="bet-history-wrapper">
      {/* Header */}
      <div className="history-header">
        <div className="header-content">
          <h1>📜 Bet History</h1>
          <p>Track all your betting activities</p>
        </div>
        <button className="refresh-btn" onClick={fetchBets} disabled={loading}>
          {loading ? "Loading..." : "🔄 Refresh"}
        </button>
      </div>

      {/* Stats */}
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <p className="stat-label">Total Bets</p>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-box success">
          <div className="stat-icon">🎉</div>
          <div className="stat-info">
            <p className="stat-label">Won</p>
            <p className="stat-value">{stats.won}</p>
          </div>
        </div>

        <div className="stat-box danger">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <p className="stat-label">Lost</p>
            <p className="stat-value">{stats.lost}</p>
          </div>
        </div>

        <div className="stat-box warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <p className="stat-label">Pending</p>
            <p className="stat-value">{stats.pending}</p>
          </div>
        </div>

        <div className="stat-box earnings">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <p className="stat-label">Total Winnings</p>
            <p className="stat-value">₹{stats.totalWinnings.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All ({bets.length})
        </button>
        <button
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => setFilter("pending")}
        >
          Pending ({stats.pending})
        </button>
        <button
          className={`filter-btn ${filter === "won" ? "active" : ""}`}
          onClick={() => setFilter("won")}
        >
          Won ({stats.won})
        </button>
        <button
          className={`filter-btn ${filter === "lost" ? "active" : ""}`}
          onClick={() => setFilter("lost")}
        >
          Lost ({stats.lost})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your bets...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredBets.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Bets Yet</h3>
          <p>
            {filter === "all"
              ? "You haven't placed any bets yet. Start betting now!"
              : `No ${filter} bets found.`}
          </p>
        </div>
      )}

      {/* Bets List */}
      <div className="bets-grid">
        {filteredBets.map((bet, index) => (
          <div
            key={bet._id}
            className="bet-card"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {/* Header */}
            <div className="bet-card-header">
              <div className="bet-header-left">
                <div className="match-icon">🎮</div>
                <div>
                  <p className="bet-match">Match #{bet.matchId?.slice(0, 8)}</p>
                  <p className="bet-date">
                    {new Date(bet.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div
                className="bet-status-badge"
                style={{ backgroundColor: getStatusColor(bet.status) }}
              >
                <span className="status-icon">{getStatusIcon(bet.status)}</span>
                <span className="status-text">{bet.status}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="bet-divider"></div>

            {/* Details */}
            <div className="bet-details">
              <div className="detail-row">
                <span className="detail-label">🏆 Team</span>
                <span className="detail-value">{bet.team}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">💵 Bet Amount</span>
                <span className="detail-value highlight">₹{bet.amount}</span>
              </div>

              <div className="detail-row">
                <span className="detail-label">📊 Odds</span>
                <span className="detail-value">{bet.odds}</span>
              </div>

              {bet.winnings && (
                <div className="detail-row">
                  <span className="detail-label">🎁 Winnings</span>
                  <span className="detail-value winnings">
                    ₹{bet.winnings.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            {bet.status === "won" && (
              <div className="bet-footer success">
                <p>🎉 Congratulations! You Won!</p>
              </div>
            )}

            {bet.status === "lost" && (
              <div className="bet-footer danger">
                <p>Better luck next time! 💪</p>
              </div>
            )}

            {bet.status === "pending" && (
              <div className="bet-footer pending">
                <p>⏳ Match in progress...</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetHistory;