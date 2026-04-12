import { userAPI } from "./api";

// 💰 wallet
export const getWallet = () => userAPI.get("/getwallet");
export const createWallet = () => userAPI.post("/create-wallet");
export const addMoney = (data) => userAPI.post("/add-money", data);

// 👥 users
export const getAllUsers = () => userAPI.get("/all-users");