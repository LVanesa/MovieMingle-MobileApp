import axios from "./axiosInstance";
export const loginUser = (data) => axios.post("/api/auth/login", data);
export const registerUser = (data) => axios.post("/api/auth/register", data);
export const loginWithGoogle = (accessToken) =>
  axios.post("/oauth2/google", { accessToken });
