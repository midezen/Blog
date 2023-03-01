import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ayblogg.herokuapp.com/api/",
});
