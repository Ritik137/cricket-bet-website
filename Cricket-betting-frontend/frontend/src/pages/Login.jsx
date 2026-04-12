import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await loginUser(form);

      const token = res.data.token || res.data?.data?.token;
      console.log("Login response token:", token, res.data);

      if (!token) {
        throw new Error("No token returned from login");
      }

      localStorage.setItem("token", token);
      login(token);

      alert("Login Success ✅");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.msg || "Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔐 Login</h2>

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "250px",
    margin: "100px auto"
  }
};

export default Login;