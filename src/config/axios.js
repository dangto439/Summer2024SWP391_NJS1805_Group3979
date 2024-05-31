import axios from "axios";

const api = axios.create({
    baseURL: "http://157.245.153.47:8080/api", //IP or ten mien
});

export default api;
