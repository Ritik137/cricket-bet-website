import MatchList from "../components/match/MatchList";
const Dashboard = () => {
  return (
    <div>
      <h1>🔥 Live Betting</h1>

      <p>Welcome to BetX Pro 🚀</p>

      {/* Matches */}
      <MatchList />

      {/* Quick actions */}
      <div style={{ marginTop: 20 }}>
        <button>💰 Wallet</button>
        <button>📜 Bet History</button>
      </div>
    </div>
  );
};

export default Dashboard; 