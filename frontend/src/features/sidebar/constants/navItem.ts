import { LayoutDashboard, CheckSquare, Bell, Settings } from 'lucide-react'
export const navItems = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    tab: "overview"
  },
  {
    label: 'Tasks',
    icon: CheckSquare,
    tab: "tasks",
  }, 
  {
    label: 'Notifications',
    icon: Bell,
    tab: "notifications"
  },
  {
    label: 'Settings',
    icon: Settings,
    tab: "settings"
  }
]
