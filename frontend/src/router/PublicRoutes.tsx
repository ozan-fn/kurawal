import Layout from "../layouts/layout";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

export default [
	{
		path: "/",
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/register",
		element: <Register />,
	},
];
