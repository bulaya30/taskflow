import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";

import { navItems } from "@/features/sidebar/constants/navItem";
import type { Notification } from "@/interfaces/notification";

type Props = {
  notifications: Notification[];
};

export default function SidebarContent({
  notifications,
}: Props) {
  const [searchParams] = useSearchParams();

  const currentTab =
    searchParams.get("tab") || "dashboard";

  const unreadNotifications =
    notifications.filter(n => !n.read).length;

  return (
    <SidebarMenu className="space-y-2">
      {navItems.map(item => {
        const Icon = item.icon;

        const isActive =
          currentTab === item.tab;

        return (
          <SidebarMenuItem key={item.tab}>
            <SidebarMenuButton asChild>

              <Link
                to={`/dashboard?tab=${item.tab}`}
                className={`flex items-center gap-2 py-5 rounded-lg transition
                ${
                  isActive
                    ? "bg-black text-white"
                    : "text-muted-foreground hover:bg-black/20 hover:text-black"
                }`}
              >
                <Icon className="w-4 h-4" />

                {item.label}

                {item.tab === "notifications" &&
                  unreadNotifications > 0 && (
                    <Badge
                      className="ml-auto bg-red-500 text-white"
                    >
                      {unreadNotifications}
                    </Badge>
                  )}

              </Link>

            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}