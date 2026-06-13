import { Link } from 'react-router-dom'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Search, Bell } from 'lucide-react'
import { useDashboardStore } from '@/store/dashboardStore'
import type { Notification } from '@/interfaces/notification'

type Props = {
  notifications: Notification[]
}
export default function DashboardHeader({ notifications }: Props) {
  const search = useDashboardStore((state) => state.search);
  const setSearch = useDashboardStore((state) => state.setSearch);
  const unreadNotifications = notifications.filter(notification => !notification.read).length
  return (
    <header className="flex items-center justify-between gap-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Task Dashboard</h1>
        <p className='text-sm text-muted-foreground'>Welcome back, Norbert</p>
      </div>
      <div className='flex items-center gap-3'>
        <form role='search' className='relative w-64' onSubmit={(e) => e.preventDefault()}>
          <Label htmlFor='task-search' className='sr-only'>
            Search tasks
          </Label>
          <Search className='
              absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
              text-muted-foreground
            ' 
          />
          <Input 
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            id='task-search' 
            placeholder='Search tasks...' 
            className='pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40'
          />
        </form>
        <Button 
          type='button' 
          aria-label='Notifications' 
          variant="outline" 
          size="icon" 
          className="rounded-full cursor-pointer bg-white/10 backdrop-blur-xl shadow-2xl hover:bg-black/10 hover:text-white"
        >
          <Link 
            aria-label='Notifications' 
            to="/dashboard?tab=notifications"
            className='flex items-center justify-center relative rounded-full  cursor-pointer'
          >
            <Bell className='h-4 w-4' />
            {unreadNotifications > 0 && (
              <Badge 
                className='absolute -top-3 -right-3 text-white bg-red-500'
              >
                {unreadNotifications}
              </Badge>
            )}
          </Link>
        </Button>
      </div>
    </header>
  )
}
