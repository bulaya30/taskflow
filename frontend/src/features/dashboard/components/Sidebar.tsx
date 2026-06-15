import { 
  Sidebar as AppSidebar, SidebarContent, SidebarMenu,
  SidebarMenuItem, SidebarMenuButton, SidebarFooter
} from '@/components/ui/sidebar'
import { queryClient } from '@/lib/queryClient'
import { Link, useSearchParams, useNavigate,  } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { navItems } from '@/features/dashboard/constants/navItem'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import useAuthStore from '@/store/authStore'

import type { Notification } from '@/interfaces/notification'

type SidebarProps = {
  notifications: Notification[]
}
export default function Sidebar({ notifications }: SidebarProps) {
  const user = useAuthStore((state) => state.user)

  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard'
  const unreadNotifications = notifications.filter(notification => !notification.read).length

  const navigate = useNavigate();

  const handleLogout = () => {
    useAuthStore.getState().logout();
    queryClient.clear();
    navigate('/login', { replace: true });
  };

  return (
    <aside className='h-screen'>
      <nav aria-label="Main navigation">
        <AppSidebar
          className="
              bg-gradient-to-br
              from-black
              via-slate-950
              to-black
              text-white
              border-r border-white/100
              dark:bg-black dark:text-white
            "
          >
          <SidebarContent className='p-4'>
              <div className="mb-10 text-center">
                <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1> 
                <p className="text-sm text-muted-foreground">
                  Manage your tasks
                </p>
              </div>
              <nav aria-label='Sidebar navigation'>
                <SidebarMenu className="space-y-2">
                  {navItems.map(item => {
                    const Icon = item.icon
                    const isActive = currentTab === item.tab
                    return (
                      <SidebarMenuItem
                        key={item.tab}
                      >
                        <SidebarMenuButton asChild>
                          <Link 
                            to={`/dashboard?tab=${item.tab}`}
                            aria-current={isActive ? "page" : undefined}
                            className={`
                              flex items-center gap-2 py-5 rounded-lg transition
                                ${isActive 
                                  ? "bg-black text-white" 
                                : " text-muted-foreground hover:bg-black/20 hover:text-black"}
                              }
                            `}
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                            {item.tab === "notifications" && unreadNotifications > 0 && (
                              <Badge 
                                className="ml-auto text-xs bg-red-500 px-2 py-0.5 rounded-full text-white font-medium"
                              >
                                {unreadNotifications}
                              </Badge>
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu> 
              </nav>
            </SidebarContent>
            <SidebarFooter className='border-t p-4 flex justify-between'>
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
        </AppSidebar>
      </nav>
    </aside>
  )
}
