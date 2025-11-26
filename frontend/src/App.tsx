import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import nprogress from "nprogress";

import "nprogress/nprogress.css";

import Home from "./features/home/Home";
import NotFound from "./features/NotFound";
import TestProgress from "./features/TestProgress";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Posts from "./features/posts/Posts";
import CreatePost from "./features/posts/CreatePost";
import EditPost from "./features/posts/EditPost";

import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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

			{/* Protected Routes */}
			<Route
				path="/posts"
				element={
					<ProtectedRoute>
						<Posts />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/create-post"
				element={
					<ProtectedRoute>
						<CreatePost />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/edit-post/:id"
				element={
					<ProtectedRoute>
						<EditPost />
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
		<BrowserRouter>
			<AuthProvider>
				<AppRouter />
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
