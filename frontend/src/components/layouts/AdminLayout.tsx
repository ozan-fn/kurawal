import { useState, type ReactNode } from "react";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { userBreadcrumbs } from "@/utils/generateBreadcrumbs";
export default function AdminLayout(props: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const routes = {
		"/": "Home",
		"/admin": "Admin",
		"/posts": "Posts",
		"/create-post": "Create Post",
		"/edit-post": "Edit Post",
	};

	const breadcrumbs = userBreadcrumbs(routes);
	return (
		// <>
		// 	{/* content */}
		// 	<div className="fixed top-0 left-0 h-screen w-screen border-b bg-white pt-16 pl-0 md:pl-64">
		// 		<div className="p-6">{props.children}</div>
		// 	</div>
		// 	{/* Sidebar */}
		// 	<div className={`fixed top-0 left-0 h-screen w-64 bg-amber-100 duration-700 ${!isSidebarOpen ? "-translate-x-full" : "translate-x-0"} border-r pt-16 md:flex! md:translate-x-0`}>
		// 		<h1 className="text-black">Kurawal</h1>
		// 	</div>

		// 	<header>
		// 		<nav>Hallo</nav>
		// 	</header>
		// 	<footer>Footer</footer>
		// </>
		<>
			<SidebarProvider className="bg-gray-50!">
				<AppSidebar />
				<main className="mt-2 mr-2 mb-2 w-full rounded-xl border-[0.5px] bg-white shadow-xs">
					{/* Header */}
					<div className="sticky top-0 flex h-16 items-center gap-2 rounded-xl bg-white/50 px-6 backdrop-blur-lg">
						<SidebarTrigger />
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbs.map((breadcrumb, index) => (
									<BreadcrumbItem key={breadcrumb.path}>
										<BreadcrumbLink href={breadcrumb.path}>{breadcrumb.label}</BreadcrumbLink>
										{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
									</BreadcrumbItem>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<div className="px-8 pb-8">{props.children}</div>
				</main>
			</SidebarProvider>
		</>
	);
}
