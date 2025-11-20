import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

function Home() {
	const [count, setCount] = useState(0);
	const { user, logout } = useAuth();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 dark:bg-gray-900">
			<div className="mb-6 flex items-center gap-6">
				<div>
					<a href="https://vite.dev" target="_blank" rel="noreferrer">
						<img src={viteLogo} className="logo h-20 w-20 transition-transform hover:scale-105" alt="Vite logo" />
					</a>
				</div>
				<div>
					<a href="https://react.dev" target="_blank" rel="noreferrer">
						<img src={reactLogo} className="logo react h-20 w-20 transition-transform hover:scale-105" alt="React logo" />
					</a>
				</div>
			</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
			<iframe src="https://davvcdn.lon1.cdn.digitaloceanspaces.com/89d0c7e26b59a6bdbeb8bfd93365c14f/a1af21b360cadcbee055.html" frameBorder="0" allow="accelerometer; gyroscope; magnetometer"></iframe>
			<h1 className="mb-4 text-4xl font-extrabold text-gray-900 dark:text-gray-100">Vite + React</h1>
			<div className="card mb-4 rounded-lg bg-white/80 p-6 shadow-md dark:bg-gray-800/70">
				<Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
				<p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
					Edit <code className="rounded bg-gray-100 px-1 dark:bg-gray-700">src/Home.tsx</code> and save to test HMR
				</p>
				<p className="mt-4 text-sm">
					<Link to="/test-progress" className="text-blue-600 hover:underline">
						Open test progress page
					</Link>
				</p>
				{user ? (
					<div className="mt-4 space-y-2">
						<p>Welcome, {user.nama}!</p>
						<div className="flex gap-2">
							<Button asChild>
								<Link to="/posts">View Posts</Link>
							</Button>
							<Button asChild variant="secondary">
								<Link to="/create-post">Create Post</Link>
							</Button>
						</div>
						<Button onClick={logout} variant="destructive">
							Logout jing
						</Button>
					</div>
				) : (
					<div className="mt-4">
						<Link to="/login" className="text-blue-600 hover:underline">
							Login
						</Link>{" "}
						|{" "}
						<Link to="/register" className="text-blue-600 hover:underline">
							Register
						</Link>
					</div>
				)}
			</div>
			<p className="read-the-docs text-sm text-gray-600 dark:text-gray-400">Click on the Vite and React logos to learn more</p>
		</div>
	);
}

export default Home;
