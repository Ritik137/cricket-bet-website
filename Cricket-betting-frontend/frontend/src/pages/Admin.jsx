import { useEffect, useState } from "react";
import { matchAPI, betAPI, userAPI } from "../services/api";
import { getAllUsers } from "../services/userService";
import "./Admin.css";

function Admin() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [bets, setBets] = useState([]);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("matches");
  const [stats, setStats] = useState({ totalUsers: 0, totalBets: 0, totalAmount: 0 });

  // 📊 Calculate stats
  useEffect(() => {
    setStats({
      totalUsers: users.length,
      totalBets: bets.length,
      totalAmount: bets.reduce((sum, bet) => sum + (bet.amount || 0), 0),
    });
  }, [users, bets]);

  // Create match
  const createMatch = async () => {
    if (!teamA || !teamB) {
      alert("❌ Enter both team names!");
      return;
    }
    try {
      setLoading(true);
      await matchAPI.post("/post-by-admin", {
        teamA,
        teamB,
        oddsA: 1.8,
        oddsB: 2.2,
      });
      alert("✅ Match Created Successfully!");
      setTeamA("");
      setTeamB("");
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Error creating match");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all bets
  const fetchBets = async () => {
    try {
      const res = await betAPI.get("/all");
      setBets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Settle bets
  const settle = async () => {
    try {
      setLoading(true);
      await betAPI.post("/settle");
      alert("✅ Bets Settled Successfully!");
      fetchBets();
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Error settling bets");
    } finally {
      setLoading(false);
    }
  };

  // Add money to user
  const handleAddMoney = async (selectedUserId) => {
    if (!amount || amount <= 0) {
      alert("❌ Enter valid amount!");
      return;
    }
    try {
      setLoading(true);
      await userAPI.post("/add-money", {
        userId: selectedUserId,
        amount: Number(amount),
      });
      alert("💰 Money added successfully!");
      setAmount("");
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Error adding money");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBets();
    fetchUsers();
  }, []);

  return (
    <div className="admin-wrapper">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-title">
          <h1>⚙️ Admin Panel</h1>
          <p>Manage matches, users, and bets</p>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <p className="stat-label">Active Bets</p>
            <p className="stat-value">{stats.totalBets}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <p className="stat-label">Total Amount</p>
            <p className="stat-value">₹{stats.totalAmount.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === "matches" ? "active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          🎯 Create Match
        </button>
        <button
          className={`tab-button ${activeTab === "money" ? "active" : ""}`}
          onClick={() => setActiveTab("money")}
        >
          💰 Add Money
        </button>
        <button
          className={`tab-button ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Users
        </button>
        <button
          className={`tab-button ${activeTab === "bets" ? "active" : ""}`}
          onClick={() => setActiveTab("bets")}
        >
          📊 Bets
        </button>
      </div>

      {/* Content */}
      <div className="admin-content">
        {/* CREATE MATCH TAB */}
        {activeTab === "matches" && (
          <div className="tab-content active-tab">
            <div className="admin-card large">
              <div className="card-header">
                <h3>🎯 Create New Match</h3>
                <p>Add a new match for betting</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); createMatch(); }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Team A Name</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏆</span>
                      <input
                        placeholder="Enter Team A name"
                        value={teamA}
                        onChange={(e) => setTeamA(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Team B Name</label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏆</span>
                      <input
                        placeholder="Enter Team B name"
                        value={teamB}
                        onChange={(e) => setTeamB(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="odds-info">
                  <p>📊 Default Odds: Team A (1.8) | Team B (2.2)</p>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "🎯 Create Match"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ADD MONEY TAB */}
        {activeTab === "money" && (
          <div className="tab-content active-tab">
            <div className="admin-card large">
              <div className="card-header">
                <h3>💰 Add Money to User</h3>
                <p>Quick add balance to any user</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>User ID</label>
                    <div className="input-wrapper">
                      <span className="input-icon">👤</span>
                      <input
                        placeholder="Paste user ID here"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Amount (₹)</label>
                    <div className="input-wrapper">
                      <span className="input-icon">💵</span>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleAddMoney(userId)}
                  disabled={loading || !userId || !amount}
                >
                  {loading ? "Processing..." : "💰 Add Money"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div className="tab-content active-tab">
            <div className="users-header">
              <h3>👥 All Users ({users.length})</h3>
            </div>

            <div className="users-grid">
              {users.map((user) => (
                <div key={user._id} className="admin-card user-card">
                  <div className="user-avatar">👤</div>

                  <div className="user-info">
                    <p className="user-email">{user.email}</p>
                    <p className="user-id">ID: {user._id.slice(0, 8)}...</p>
                  </div>

                  <div className="user-actions">
                    <input
                      type="number"
                      placeholder="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                      className="user-input"
                    />
                    <button
                      onClick={() => handleAddMoney(user._id)}
                      className="btn btn-small btn-success"
                      disabled={loading}
                    >
                      💰 Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BETS TAB */}
        {activeTab === "bets" && (
          <div className="tab-content active-tab">
            <div className="bets-header">
              <h3>📊 All Bets ({bets.length})</h3>
              <button
                onClick={settle}
                className="btn btn-warning"
                disabled={loading || bets.length === 0}
              >
                {loading ? "Settling..." : "💰 Settle Bets"}
              </button>
            </div>

            <div className="bets-list">
              {bets.length === 0 ? (
                <div className="empty-state">
                  <p>📭 No bets yet</p>
                </div>
              ) : (
                bets.map((bet) => (
                  <div key={bet._id} className="admin-card bet-card">
                    <div className="bet-status" style={{
                      background: bet.status === "pending" ? "#ff6b35" : 
                                 bet.status === "won" ? "#00d9a3" : "#ff4757"
                    }}>
                      {bet.status}
                    </div>

                    <div className="bet-info">
                      <p><span className="bet-label">User ID:</span> {bet.userId.slice(0, 8)}...</p>
                      <p><span className="bet-label">Amount:</span> <strong>₹{bet.amount}</strong></p>
                      <p><span className="bet-label">Pick:</span> {bet.pick}</p>
                    </div>

                    <div className="bet-odds">
                      <p>Odds: <strong>{bet.odds}</strong></p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;