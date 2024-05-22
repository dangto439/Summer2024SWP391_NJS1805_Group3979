import axios from "axios";

const api = axios.create({
    baseURL: "http://api.example.com", //IP or ten mien
});

export default api;
