import { useEffect, useState } from "react";
import { matchAPI, betAPI, userAPI } from "../services/api";
import { getAllUsers } from "../services/userService";

function Admin() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [bets, setBets] = useState([]);
  const [users, setUsers] = useState([]);

  // 💰 NEW STATES (ADD MONEY)
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");

  // create match
  const createMatch = async () => {
    try {
      await matchAPI.post("/post-by-admin", {
        teamA,
        teamB,
        oddsA: 1.8,
        oddsB: 2.2,
      });
      alert("Match Created");
    } catch (err) {
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  // get all bets
  const fetchBets = async () => {
    try {
      const res = await betAPI.get("/all");
      setBets(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  // fetch all users
  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // settle bets
  const settle = async () => {
    try {
      await betAPI.post("/settle");
      alert("Bets Settled ✅");
      fetchBets();
    } catch (err) {
      alert(err.response?.data?.msg || "Error ❌");
    }
  };

  // 💰 ADD MONEY FUNCTION
const handleAddMoney = async (selectedUserId) => {
  try {
    await userAPI.post("/add-money", {
      userId: selectedUserId,
      amount: Number(amount),
    });

    alert("💰 Money added successfully!");
    setAmount("");
  } catch (err) {
    alert(err.response?.data?.msg || "Error ❌");
  }
};

  useEffect(() => {
    fetchBets();
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>⚙️ Admin Panel</h2>

      {/* CREATE MATCH */}
      <div className="card">
        <h3>🎯 Create Match</h3>
        <input
          placeholder="Team A"
          onChange={(e) => setTeamA(e.target.value)}
        />
        <input
          placeholder="Team B"
          onChange={(e) => setTeamB(e.target.value)}
        />
        <button onClick={createMatch}>Create Match</button>
      </div>

      {/* 💰 ADD MONEY */}
      <div className="card">
        <h3>💰 Add Money to User</h3>

        <input
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handleAddMoney}>Add Money</button>
      </div>

      {/* 👥 USER LIST */}
      <div>
        <h3>👥 All Users</h3>

        {users.map((user) => (
          <div key={user._id} className="card">
            <p>
              <b>{user.email}</b>
            </p>
            <p>ID: {user._id}</p>

            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => setAmount(e.target.value)}
            />

            <button onClick={() => handleAddMoney(user._id)}>
              💰 Add Money
            </button>
          </div>
        ))}
      </div>

      {/* ALL BETS */}
      <div>
        <h3>📊 All Bets</h3>
        {bets.map((bet) => (
          <div key={bet._id} className="card">
            <p>User: {bet.userId}</p>
            <p>Amount: ₹{bet.amount}</p>
            <p>Status: {bet.status}</p>
          </div>
        ))}
      </div>

      <button onClick={settle}>💰 Settle Bets</button>
    </div>
  );
}

export default Admin;
