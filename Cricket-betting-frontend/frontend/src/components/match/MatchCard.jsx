import { useState } from "react";
import BetPopup from "../bet/BetPopup";

const MatchCard = ({ match }) => {
  const [show, setShow] = useState(false);
  const [team, setTeam] = useState("");

  return (
    <div style={styles.card}>
      <h3>{match.teamA} vs {match.teamB}</h3>

      <div style={styles.btns}>
        <button onClick={() => { setTeam(match.teamA); setShow(true); }}>
          {match.teamA} ({match.oddsA})
        </button>

        <button onClick={() => { setTeam(match.teamB); setShow(true); }}>
          {match.teamB} ({match.oddsB})
        </button>
      </div>

      {show && (
        <BetPopup match={match} team={team} onClose={() => setShow(false)} />
      )}
    </div>
  );
};

const styles = {
  card: { background: "#1e1e2f", padding: 20, margin: 10, color: "#fff" },
  btns: { display: "flex", gap: 10 }
};

export default MatchCard;