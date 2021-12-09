import axios from "axios";

const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://evening-oasis-12273.herokuapp.com/api";

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
