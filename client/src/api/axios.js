import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

const instance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    withCredentials: true,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default instance;