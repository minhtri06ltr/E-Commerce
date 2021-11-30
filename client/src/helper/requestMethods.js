import axios from "axios";

const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://arcane-ravine-81598.herokuapp.com/api";

const user = JSON.parse(
  localStorage.getItem("persist:root"),
)?.user;
const currentUser =
  user && JSON.parse(user).currentUser;
const token = currentUser?.accessToken;
export const publicRequest = axios.create({
  baseURL: apiUrl,
});
export const userRequest = axios.create({
  baseURL: apiUrl,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
