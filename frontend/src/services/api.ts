import axios from "axios";

const API = axios.create({
  baseURL: "https://campus-issue-tracker-4.onrender.com/api",
});

export default API;
