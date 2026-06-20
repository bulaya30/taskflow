import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";

import useAuthStore from "@/store/authStore";
import { queryClient } from '@/lib/queryClient'
import { useNavigate,  } from 'react-router-dom'

import SidebarContentMenu from "@/features/sidebar/components/SidebarContent";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";


import type { Notification } from "@/interfaces/notification";

type Props = {
  notifications: Notification[];
};

export default function DesktopSidebar({
  notifications,
}: Props) {
    const user = useAuthStore((state) => state.user)

    const navigate = useNavigate();

    const handleLogout = () => {
        useAuthStore.getState().logout();
        queryClient.clear();
        navigate('/login', { replace: true });
    };

  return (

    <aside className="hidden md:block">

      <Sidebar
        className="
        bg-gradient-to-br
        from-black
        via-slate-950
        to-black
        text-white
        overflow-y-hidden
      "
      >

        <SidebarContent className="p-4">

          <header className="mb-10 text-center">

            <h2 className="text-xl font-bold">
              TaskFlow
            </h2>

            <p className="text-sm text-muted-foreground">
              Manage your tasks
            </p>

          </header>

          <SidebarContentMenu
            notifications={notifications}
          />

        </SidebarContent>

        <SidebarFooter className="border-t p-4">

          <div className="flex items-center gap-3">
                <div 
                  className="
                    flex w-10 h-10 items-center justify-center rounded-full 
                    bg-blue-100 text-blue-600 text-sm font-bold
                  "
                >
                  {user?.firstName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{`${user?.firstName} ${user?.lastName}`}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Button 
                variant="destructive" 
                className='flex items-center gap-2 cursor-pointer' 
                size="sm" 
                aria-label='Logout'
                onClick={handleLogout}
                >
                  <LogOut className='w-4 h-4' />
                  Logout
                </Button>

        </SidebarFooter>

      </Sidebar>

    </aside>

  );
}