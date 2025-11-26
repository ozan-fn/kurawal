import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
	children?: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		const location = useLocation();
		return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
	}

	return <>{children}</>;
}
