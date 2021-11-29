import axios from "axios";

const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://arcane-ravine-81598.herokuapp.com/api";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTIxZTJmMmU4YWFmYWRjZTkzMDMzYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODExNTExNywiZXhwIjoxNjM4Mzc0MzE3fQ.x26TrBYv8cSGpqg2wMsNsUFcoAYiOrK9kR9gKwb3Riw";
export const publicRequest = axios.create({
  baseURL: apiUrl,
});
export const userRequest = axios.create({
  baseURL: apiUrl,
  header: { token: `Bearer ${token}` },
});
