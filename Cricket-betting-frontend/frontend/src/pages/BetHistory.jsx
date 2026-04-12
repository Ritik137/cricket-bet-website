import { useEffect, useState } from "react";
import { getMyBets } from "../services/betService";

const BetHistory = () => {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    fetchBets();
  }, []);

  const fetchBets = async () => {
    const res = await getMyBets();
    setBets(res.data);
  };

  return (
    <div>
      <h2>📜 Bet History</h2>

      {bets.map((bet) => (
        <div className="card" key={bet._id}>
          <p>Match: {bet.matchId}</p>
          <p>Team: {bet.team}</p>
          <p>Amount: ₹{bet.amount}</p>
          <p>Status: {bet.status}</p>
        </div>
      ))}
    </div>
  );
};

export default BetHistory;