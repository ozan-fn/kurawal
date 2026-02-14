import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookOpen, Calendar, HomeIcon, Image, Settings, Tags } from "lucide-react";
import kurawalSidebar from "@/assets/kurawal-sidebar.svg";
import { Link, useLocation } from "react-router-dom";
const items = [
	{
		title: "Dashboard",
		url: "/admin",
		icon: HomeIcon,
	},
	{
		title: "Posts",
		url: "/admin/posts",
		icon: BookOpen,
	},
	{
		title: "Tags",
		url: "/admin/tags",
		icon: Tags,
	},
	{
		title: "Media",
		url: "/admin/media",
		icon: Image,
	},
];
export function AppSidebar() {
	const pathname = useLocation().pathname;
	return (
		<Sidebar className="mt-4 border-0! pl-4">
			<SidebarMenu>
				<SidebarHeader className="bg-gray-50!">
					<div className="flex items-center gap-2">
						<img src={kurawalSidebar} alt="" className="size-8" />
						<h4 className="text-md font-medium"> Dashboard Kurawal</h4>
					</div>
				</SidebarHeader>
			</SidebarMenu>
			<SidebarContent className="bg-gray-50!">
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton isActive={pathname === item.url} size={"md"} className="" asChild>
										<Link to={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
