import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const payload = JSON.parse(atob(token.split(".")[1]));
			setUser({ id: payload.id, nama: payload.nama, email: payload.email });
		}
		setLoading(false);
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post("/api/auth/login", { email, password });
			const { token, refreshToken } = response.data;
			localStorage.setItem("token", token);
			localStorage.setItem("refreshToken", refreshToken);
			// Decode token to get user info (simplified)
			const payload = JSON.parse(atob(token.split(".")[1]));
			setUser({ id: payload.id, nama: payload.nama, email: payload.email });
		} catch (error) {
			throw error;
		}
	};

	const register = async (nama: string, email: string, password: string) => {
		try {
			await axios.post("/api/auth/register", { nama, email, password });
			// After register, auto login
			await login(email, password);
		} catch (error) {
			throw error;
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("refreshToken");
		setUser(null);
	};

	return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};
