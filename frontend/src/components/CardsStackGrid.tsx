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
		name: "Next.js",
		username: "nextjs",
		designation: "The React Framework",
		avatar: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4",
		content: (
			<p>
				<Highlight>File-system routing</Highlight> + <Highlight>App Router</Highlight> changed everything. We shipped our enterprise dashboard in 3 weeks instead of 3 months.
			</p>
		),
	},

	{
		id: 1,
		name: "TypeScript",
		username: "typescript",
		designation: "JavaScript with syntax for types",
		avatar: "https://avatars.githubusercontent.com/u/6154722?s=200&v=4",
		content: (
			<p>
				Catching bugs at compile time saved us <Highlight>40% debugging time</Highlight>. Our 15-person team now moves faster and with zero runtime type errors.
			</p>
		),
	},

	{
		id: 2,
		name: "Tailwind CSS",
		username: "tailwindcss",
		designation: "Rapidly build modern UIs",
		avatar: "https://avatars.githubusercontent.com/u/67109815?s=200&v=4",
		content: (
			<p>
				No more context switching between CSS files.
				<Highlight>Designers → Developers handoff</Highlight> is now literally instant.
			</p>
		),
	},

	{
		id: 3,
		name: "Supabase",
		username: "supabase",
		designation: "Open-source Firebase alternative",
		avatar: "https://avatars.githubusercontent.com/u/54469796?s=200&v=4",
		content: (
			<p>
				Postgres + Auth + Storage + Edge Functions in one dashboard. We replaced Firebase entirely and cut our backend costs by <Highlight>68%</Highlight>.
			</p>
		),
	},

	{
		id: 4,
		name: "Vercel",
		username: "vercel",
		designation: "Frontend Cloud",
		avatar: "https://avatars.githubusercontent.com/u/14985020?s=200&v=4",
		content: (
			<p>
				<Highlight>Preview URLs on every push</Highlight> + zero-config Edge Network. Our marketing team now ships landing pages without engineering help.
			</p>
		),
	},

	{
		id: 5,
		name: "Drizzle ORM",
		username: "drizzleorm",
		designation: "TypeScript-first ORM",
		avatar: "https://avatars.githubusercontent.com/u/114422069?s=200&v=4",
		content: (
			<p>
				Full type safety from database to frontend.
				<Highlight>No more Zod + manual validation layers</Highlight> — Drizzle Studio is a game changer.
			</p>
		),
	},

	{
		id: 6,
		name: "shadcn/ui",
		username: "shadcn",
		designation: "Beautifully designed components",
		avatar: "https://avatars.githubusercontent.com/u/124599?s=200&v=4",
		content: (
			<p>
				Copy-paste components that just work with Tailwind. Our design system went from 4 months to <Highlight>4 days</Highlight>.
			</p>
		),
	},
];
