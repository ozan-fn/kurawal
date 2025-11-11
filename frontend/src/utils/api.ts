import axios from "axios";

const api = axios.create({
	baseURL: "/api",
});

// Request interceptor to add token
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = localStorage.getItem("refreshToken");
			if (refreshToken) {
				try {
					const response = await axios.post("/api/auth/refresh", { refreshToken });
					const { token } = response.data;
					localStorage.setItem("token", token);
					originalRequest.headers.Authorization = `Bearer ${token}`;
					return api(originalRequest);
				} catch (refreshError) {
					// Refresh failed, logout
					localStorage.removeItem("token");
					localStorage.removeItem("refreshToken");
					window.location.href = "/login"; // Redirect to login
					return Promise.reject(refreshError);
				}
			}
		}
		return Promise.reject(error);
	},
);

export default api;
