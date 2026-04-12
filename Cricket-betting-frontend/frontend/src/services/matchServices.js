import {matchAPI} from "./api";

export const getMatches = () => matchAPI.get("/get-match");

export const createMatch = (data) => matchAPI.post("/post-by-admin", data);