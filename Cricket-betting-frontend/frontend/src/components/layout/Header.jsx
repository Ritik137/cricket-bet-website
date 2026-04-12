import { useEffect, useState } from "react";
import { userAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const [balance, setBalance] = useState(0);
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
      const res = await userAPI.get("/getwallet"); // ✅ FIXED URL
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWallet();

    window.addEventListener("walletUpdate", fetchWallet);
    return () => {
      window.removeEventListener("walletUpdate", fetchWallet);
    };
  }, []);

  return (
    <div style={header}>
      {/* LOGO */}
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        🔥 BetX Pro
      </h2>

      {/* NAV */}
      <div style={nav}>
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/history")}>My Bets</button>

        {/* 🔥 ADMIN BUTTON */}
        {role === "admin" && (
          <button onClick={() => navigate("/admin")}>Admin</button>
        )}

        <span>💰 ₹{balance}</span>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const header = {
  background: "#1e1e2f",
  color: "white",
  padding: "10px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const nav = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

export default Header;