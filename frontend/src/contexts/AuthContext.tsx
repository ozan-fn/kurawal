import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { createAuthClient } from "better-auth/client";

// Setup Better Auth client
const authClient = createAuthClient({
	// baseURL: "http://localhost:3000", // Sesuaikan dengan URL server Anda
});

interface User {
	id: string;
	name: string;
	email: string;
}

interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<void>;
	register: (name: string, email: string, password: string) => Promise<void>;
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

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const { data } = await authClient.getSession();
			if (data) {
				setUser({
					id: data.user.id,
					name: data.user.name,
					email: data.user.email,
				});
			} else {
				setUser(null);
			}
		} catch (error) {
			setUser(null);
		}
		setLoading(false);
	};

	const login = async (email: string, password: string) => {
		const { error } = await authClient.signIn.email({
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}

		await checkAuth();
	};

	const register = async (name: string, email: string, password: string) => {
		const { error } = await authClient.signUp.email({
			name,
			email,
			password,
		});

		if (error) {
			throw new Error(error.message);
		}

		// After register, auto login
		await login(email, password);
	};

	const logout = async () => {
		await authClient.signOut();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout, loading }}>
			<>{children}</>
		</AuthContext.Provider>
	);
};
