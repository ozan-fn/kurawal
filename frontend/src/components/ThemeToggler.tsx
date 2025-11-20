import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const ThemeToggler = () => {
	return (
		<button className="flex items-center justify-center rounded-md p-2 transition hover:bg-gray-100">
			<span className="flex h-4 w-4 items-center justify-center">
				<AnimatedThemeToggler className="text-gray-600" />
			</span>
		</button>
	);
};

export default ThemeToggler;
