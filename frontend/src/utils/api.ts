import axios from "axios";

const api = axios.create({
	baseURL: "/api",
	withCredentials: true,
});

// No need for request interceptor since tokens are in httpOnly cookies

// Response interceptor to handle token refresh
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				await axios.post("/api/auth/refresh");
				// Refresh successful, retry original request
				return api(originalRequest);
			} catch (refreshError) {
				// Throw custom error for session expired
				throw new Error("SESSION_EXPIRED");
			}
		}
		return Promise.reject(error);
	},
);

export default api;
