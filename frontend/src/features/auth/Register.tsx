import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";

export default function Register() {
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Registration</CardTitle>
					<CardDescription>Registration is currently disabled</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
						<p className="text-sm text-blue-800 dark:text-blue-300">Registration is not available at this time. Please contact the administrator if you need an account.</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
