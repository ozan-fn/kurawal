import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

import publicRoutes from "./PublicRoutes";
import privateRoutes from "./PrivateRoutes";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../features/not-found/NotFound";
import TestProgress from "../features/TestProgress";

export default function AppRouter() {
	const location = useLocation();

	useEffect(() => {
		nprogress.configure({ showSpinner: false });
		nprogress.start();
		const timer = setTimeout(() => nprogress.done(), 300);
		return () => clearTimeout(timer);
	}, [location]);

	return (
		<Routes>
			{/* Public */}
			{publicRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={element} />
			))}

			{/* Private */}
			{privateRoutes.map(({ path, element }) => (
				<Route key={path} path={path} element={<ProtectedRoute>{element}</ProtectedRoute>} />
			))}

			{/* Utility */}
			<Route path="/test-progress" element={<TestProgress />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
