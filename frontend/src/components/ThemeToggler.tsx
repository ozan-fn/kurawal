import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const ThemeToggler = () => {
	return (
		<button className="flex items-center justify-center rounded-md p-2 transition hover:bg-neutral-100 dark:hover:bg-neutral-800">
			<span className="flex h-4 w-4 items-center justify-center">
				<AnimatedThemeToggler className="text-neutral-800 dark:text-neutral-100" />
			</span>
		</button>
	);
};

export default ThemeToggler;
