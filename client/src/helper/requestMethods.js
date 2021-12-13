import axios from "axios";

const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://evening-oasis-12273.herokuapp.com/api";



export const userRequest = axios.create({
  baseURL: apiUrl,
})
userRequest.interceptors.request.use(
  (config) => {
    const user = JSON.parse(
      localStorage.getItem("persist:root"),
    )?.user;
    const currentUser =
      user && JSON.parse(user).currentUser;
    const token = currentUser?.accessToken;
    if (token) {
    config.baseURL= apiUrl;
      config.headers.Authorization  = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const publicRequest = axios.create({
  baseURL: apiUrl,
});
// export const userRequest = axios.create({
//   baseURL: apiUrl,
//   headers: {
//     Authorization: token ? `Bearer ${token}` : "",
//   },
// });
