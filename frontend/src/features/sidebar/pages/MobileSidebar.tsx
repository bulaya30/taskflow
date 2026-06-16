import SidebarContentMenu from "@/features/sidebar/components/SidebarContent";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

import type { Notification } from "@/interfaces/notification";
import useAuthStore from "@/store/authStore";
import { queryClient } from '@/lib/queryClient'
import { useNavigate,  } from 'react-router-dom'

type Props = {
  notifications: Notification[];
};

export default function MobileSidebar({
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

    <aside
      className="
      flex
      h-full
      flex-col
      bg-gradient-to-br
      from-black
      via-slate-950
      to-black
      text-white
    "
    >

      <header className="border-b p-6 text-center">

        <h1 className="text-xl font-bold">

          TaskFlow

        </h1>

        <p className="text-sm text-muted-foreground">

          Manage your tasks

        </p>

      </header>

      <main className="flex-1 overflow-auto p-4">

        <SidebarContentMenu
          notifications={notifications}
        />

      </main>

      <footer className="border-t p-4 space-y-4">

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

      </footer>

    </aside>

  );
}