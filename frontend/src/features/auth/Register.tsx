import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export default function Register() {
	const [nama, setNama] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { register, user } = useAuth();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const redirectTo = searchParams.get("redirect") || "/";

	useEffect(() => {
		if (user) {
			navigate(redirectTo);
		}
	}, [user, navigate, redirectTo]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await register(nama, email, password);
			navigate(redirectTo);
		} catch (err: any) {
			setError(err.response?.data?.message || "Registration failed");
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Register</CardTitle>
					<CardDescription>Create a new account to get started</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="nama">Name</Label>
							<Input id="nama" type="text" value={nama} onChange={(e) => setNama(e.target.value)} required placeholder="Enter your name" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your password" />
						</div>
						{error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
						<Button type="submit" className="w-full">
							Register
						</Button>
					</form>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<Link to="/login" className="text-primary hover:underline">
							Login
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
