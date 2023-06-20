import axios from "axios";
import { getSessionToken } from "../utils/storage";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000"
});

axiosInstance.interceptors.request.use((config) => {
    const token = getSessionToken("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
