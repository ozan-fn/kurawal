import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import api from "../utils/api";

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
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

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const { data } = await api.get("/auth/me");
			setUser(data.user);
		} catch (error) {
			setUser(null);
		}
		setLoading(false);
	};

	const login = async (email: string, password: string) => {
		try {
			const { data } = await api.post("/auth/login", { email, password });
			setUser(data.user);
		} catch (error: any) {
			throw new Error(error.response?.data?.message || "Login failed");
		}
	};

	const logout = async () => {
		try {
			await api.post("/auth/logout");
			setUser(null);
		} catch (error: any) {
			throw new Error(error.response?.data?.message || "Logout failed");
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			<>{children}</>
		</AuthContext.Provider>
	);
};
