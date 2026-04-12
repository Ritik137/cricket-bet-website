import { authAPI } from "./api";

export const loginUser = (data) => authAPI.post("/login", data);

export const registerUser = (data) => authAPI.post("/register", data);