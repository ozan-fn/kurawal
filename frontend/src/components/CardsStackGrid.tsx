import { cn } from "@/lib/utils";
import { CardStack } from "./ui/card-stack";
export function CardStackGrid() {
	return (
		<div className="flex w-full items-center justify-center">
			<CardStack items={CARDS} />
		</div>
	);
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
	return <span className={cn("bg-emerald-100 px-1 py-0.5 font-bold text-emerald-700 dark:bg-emerald-700/20 dark:text-emerald-500", className)}>{children}</span>;
};

const CARDS = [
	{
		id: 0,
		name: "Tailwind CSS",
		username: "tailwindcss",
		designation: "Utility-first CSS Framework",
		avatar: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
		content: (
			<p>
				Rapidly build modern websites without ever leaving your HTML. A <span className="font-semibold text-sky-500">utility-first CSS framework</span> packed with classes.
			</p>
		),
	},

	{
		id: 1,
		name: "Vercel",
		username: "vercel",
		designation: "Deploy & Scale",
		avatar: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4",
		content: (
			<p>
				Deploy <span className="font-semibold text-black dark:text-white">Next.js</span> apps instantly with the best developer experience. Shipping the future of the web.
			</p>
		),
	},

	{
		id: 2,
		name: "Prisma",
		username: "prisma",
		designation: "Next-gen ORM",
		avatar: "https://avatars.githubusercontent.com/u/17219288?s=200&v=4",
		content: (
			<p>
				Modern database access for TypeScript & Node.js. Fast, type-safe, and <span className="font-semibold text-purple-500">fully typed end-to-end</span>.
			</p>
		),
	},

	{
		id: 3,
		name: "GitHub",
		username: "github",
		designation: "Where the world builds software",
		avatar: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
		content: <p>Collaborate, ship, and build software better together. Open source lives here.</p>,
	},
];
