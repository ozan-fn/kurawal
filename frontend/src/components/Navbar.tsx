import { Search, Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import { Button } from "./ui/button";

import logoLight from "@/assets/svg/logo-light-mode.svg";
import logoDark from "@/assets/svg/logo-dark-mode.svg";

const navbarItems = [
	{ id: 1, title: "Work", href: "#" },
	{ id: 2, title: "Blog", href: "#" },
	{ id: 3, title: "Resources", href: "#" },
	{ id: 4, title: "About", href: "#" },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const isDark = document.documentElement.classList.contains("dark");
		setIsDarkMode(isDark);

		const observer = new MutationObserver(() => {
			const dark = document.documentElement.classList.contains("dark");
			setIsDarkMode(dark);
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"],
		});

		return () => observer.disconnect();
	}, []);

	return (
		<header className="sticky top-0 z-50 h-14 border-b border-dashed border-gray-300 bg-white/70 backdrop-blur-md">
			<nav className="mx-auto flex h-full w-full max-w-[1400px] items-center justify-between border-dashed px-4 min-[1400px]:border-x">
				{/* Left */}
				<div className="flex flex-1 items-center text-lg font-semibold">
					<img src={isDarkMode ? logoDark : logoLight} alt="Logo" className="h-5 w-auto" />
				</div>

				{/* Center */}
				<ul className="hidden items-center gap-6 text-sm text-gray-700 lg:flex">
					{navbarItems.map((item) => (
						<li key={item.id}>
							<a href={item.href} className="hover:text-gray-900">
								{item.title}
							</a>
						</li>
					))}
				</ul>

				{/* Right */}
				<div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
					<button className="rounded-md p-2 transition hover:bg-gray-100">
						<Search className="h-4 w-4 text-gray-600" />
					</button>

					<ThemeToggler />

					<button className="rounded-md p-2 transition hover:bg-gray-100">
						<Github className="h-4 w-4 text-gray-600" />
					</button>

					<Button>Get Access</Button>
				</div>

				{/* Right - Tablet */}
				<div className="hidden flex-1 items-center justify-end gap-2 md:flex lg:hidden">
					<button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center rounded-md p-2 transition hover:bg-gray-100">
						{isOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
					</button>

					<button className="rounded-md p-2 transition hover:bg-gray-100">
						<Search className="h-4 w-4 text-gray-600" />
					</button>

					<ThemeToggler />

					<button className="rounded-md p-2 transition hover:bg-gray-100">
						<Github className="h-4 w-4 text-gray-600" />
					</button>

					<Button>Get Access</Button>
				</div>

				{/* Hamburger Button - Mobile Only */}
				<button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center rounded-md p-2 transition hover:bg-gray-100 md:hidden">
					{isOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
				</button>
			</nav>

			{/* Mobile Menu - Full */}
			{isOpen && (
				<div className="border-b border-dashed border-gray-300 bg-white/70 backdrop-blur-md md:hidden">
					<div className="mx-auto max-w-[1400px] px-4 py-4">
						{/* Navigation Links */}
						<ul className="mb-4 space-y-3 border-b border-dashed border-gray-300 pb-4">
							{navbarItems.map((item) => (
								<li key={item.id}>
									<a href={item.href} className="block text-sm text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
										{item.title}
									</a>
								</li>
							))}
						</ul>

						{/* Action Buttons */}
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<button className="rounded-md p-2 transition hover:bg-gray-100">
									<Search className="h-4 w-4 text-gray-600" />
								</button>

								<ThemeToggler />

								<button className="rounded-md p-2 transition hover:bg-gray-100">
									<Github className="h-4 w-4 text-gray-600" />
								</button>
							</div>

							<Button>Get Access</Button>
						</div>
					</div>
				</div>
			)}

			{/* Tablet Menu (md to lg) - Only Navigation Links */}
			{isOpen && (
				<div className="hidden border-b border-dashed border-gray-300 bg-white/70 backdrop-blur-md md:block lg:hidden">
					<div className="mx-auto max-w-[1400px] px-4 py-4">
						<ul className="space-y-3">
							{navbarItems.map((item) => (
								<li key={item.id}>
									<a href={item.href} className="block text-sm text-gray-700 hover:text-gray-900" onClick={() => setIsOpen(false)}>
										{item.title}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</header>
	);
}
