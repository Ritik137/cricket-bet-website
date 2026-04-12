import { useEffect, useState } from "react";
import socket from "../../services/socket";
import { matchAPI } from "../../services/api";
import MatchCard from "./MatchCard";

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // ✅ initial load
    const fetchMatches = async () => {
      try {
        const res = await matchAPI.get("/get-match");
        setMatches(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMatches();

    // 🔥 live update
    socket.on("oddsUpdate", (data) => {
      setMatches(data);
    });

    return () => socket.off("oddsUpdate");
  }, []);

  return (
    <div>
      {matches.map((match) => (
        <MatchCard key={match._id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;