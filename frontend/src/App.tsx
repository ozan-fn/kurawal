import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import nprogress from "nprogress";

import "nprogress/nprogress.css";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TestProgress from "./pages/TestProgress";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Posts from "./pages/posts/Posts";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";
import { NuqsAdapter } from "nuqs/adapters/react";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/admin/Admin";
import UploadMedia from "./pages/admin/media/UploadMedia";

function AppRouter() {
	const location = useLocation();

	useEffect(() => {
		nprogress.configure({ showSpinner: false });
		nprogress.start();
		const timer = setTimeout(() => nprogress.done(), 300);
		return () => clearTimeout(timer);
	}, [location]);

	return (
		<Routes>
			{/* Public Routes */}
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			{/* Atmin */}
			<Route path="/admin" element={<Admin />} />

			{/* Protected Routes */}
			<Route
				path="/posts"
				element={
					<ProtectedRoute>
						<Posts />
					</ProtectedRoute>
				}
			/>
			<Route path="/create-post" element={<CreatePost />} />
			<Route
				path="/edit-post/:id"
				element={
					<ProtectedRoute>
						<EditPost />
					</ProtectedRoute>
				}
			/>

			{/* Medie */}
			<Route
				path="/media"
				element={
					<ProtectedRoute>
						<NuqsAdapter>
							{/* <Nuqsad */}
							<UploadMedia />
						</NuqsAdapter>
					</ProtectedRoute>
				}
			/>
			{/* Utility Routes */}
			<Route path="/test-progress" element={<TestProgress />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
