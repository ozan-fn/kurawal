import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Set axios to send credentials (cookies)
axios.defaults.withCredentials = true;

interface User {
	id: string;
	nama: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (nama: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const response = await axios.get("/api/auth/me");
			setUser(response.data);
		} catch (error: any) {
			if (error.message === "SESSION_EXPIRED") {
				navigate("/login");
			}
			setUser(null);
		}
		setLoading(false);
	};

	const login = async (email: string, password: string) => {
		try {
			await axios.post("/api/auth/login", { email, password });
			await checkAuth();
		} catch (error: any) {
			if (error.message === "SESSION_EXPIRED") {
				navigate("/login");
			}
			throw error;
		}
	};

	const register = async (nama: string, email: string, password: string) => {
		try {
			await axios.post("/api/auth/register", { nama, email, password });
			// After register, auto login
			await login(email, password);
		} catch (error: any) {
			if (error.message === "SESSION_EXPIRED") {
				navigate("/login");
			}
			throw error;
		}
	};

	const logout = async () => {
		try {
			await axios.post("/api/auth/logout");
			setUser(null);
		} catch (error: any) {
			if (error.message === "SESSION_EXPIRED") {
				navigate("/login");
			}
			// Even if logout fails, clear user
			setUser(null);
		}
	};

	return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};
