import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { BookOpen, Calendar, HomeIcon, Image, Settings } from "lucide-react";
import kurawalSidebar from "@/assets/kurawal-sidebar.svg";
import { useLocation } from "react-router-dom";
const items = [
	{
		title: "Posts",
		url: "/posts",
		icon: BookOpen,
	},
	{
		title: "Media",
		url: "/media",
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
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
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
