import { Search, Github } from "lucide-react";
import ThemeToggler from "./ThemeToggler";

const navbarItems = [
	{ id: 1, title: "Work", href: "#" },
	{ id: 2, title: "Blog", href: "#" },
	{ id: 3, title: "Resources", href: "#" },
	{ id: 4, title: "About", href: "#" },
];

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 h-14 border-b border-dashed border-gray-300 bg-white/70 backdrop-blur-md">
			<nav className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between border-dashed px-4 min-[1400px]:border-x">
				{/* Left */}
				<div className="flex flex-1 items-center text-lg font-semibold">Kurawal</div>

				{/* Center */}
				<ul className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
					{navbarItems.map((item) => (
						<li key={item.id}>
							<a href={item.href} className="hover:text-gray-900">
								{item.title}
							</a>
						</li>
					))}
				</ul>

				{/* Right */}
				<div className="flex flex-1 items-center justify-end gap-3">
					<button className="rounded-md p-2 transition hover:bg-gray-100">
						<Search className="h-4 w-4 text-gray-600" />
					</button>

					<ThemeToggler />

					<button className="rounded-md p-2 transition hover:bg-gray-100">
						<Github className="h-4 w-4 text-gray-600" />
					</button>

					<button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50">Sign in</button>
					<button className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-900">Get Access</button>
				</div>
			</nav>
		</header>
	);
}
