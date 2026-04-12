import { betAPI } from "./api";

export const placeBet = (data) => betAPI.post("/place-bet", data);

export const getMyBets = () => betAPI.get("/get-my-bets");