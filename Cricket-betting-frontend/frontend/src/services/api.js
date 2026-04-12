import axios from "axios";

// ✅ AUTH SERVICE
export const authAPI = axios.create({
  baseURL: "http://localhost:5001/api/auth",
});

// ✅ MATCH SERVICE
export const matchAPI = axios.create({
  baseURL: "http://localhost:5003/api/match",
});

// ✅ BET SERVICE
export const betAPI = axios.create({
  baseURL: "http://localhost:5004/api/bet",
});

// ✅ USER / WALLET SERVICE (same service use ho raha hai)
export const userAPI = axios.create({
  baseURL: "http://localhost:5002/api/user",
});

// 🔐 TOKEN ATTACH
const attachToken = (api) => {
  api.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  });
};

[authAPI, matchAPI, betAPI, userAPI].forEach(attachToken);

export default { authAPI, matchAPI, betAPI, userAPI };