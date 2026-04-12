import { useState } from "react";
import { betAPI } from "../../services/api";

const BetPopup = ({ match, team, onClose }) => {
  const [amount, setAmount] = useState("");

  const placeBet = async () => {
    try {
      await betAPI.post("/place-bet", {
        matchId: match._id,
        team,
        amount: Number(amount),
      });

      // 🔥 wallet update trigger
      window.dispatchEvent(new Event("walletUpdate"));

      alert("Bet Placed ✅");
      onClose();
    } catch (err) {
  console.log("ERROR:", err.response?.data);

  const message =
    err.response?.data?.msg || "Something went wrong ❌";

  alert(message); // 🔥 dynamic message
}
  };

  return (
    <div style={{ background: "#333", padding: 20 }}>
      <h3>Bet on {team}</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={placeBet}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BetPopup;