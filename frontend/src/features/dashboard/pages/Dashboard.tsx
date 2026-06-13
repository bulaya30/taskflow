import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { SidebarProvider } from "@/components/ui/sidebar"

import DashboardHeader from "@/features/dashboard/components/DashboardHeader"
import Sidebar from "@/features/dashboard/components/Sidebar"

import OverviewTab from "@/features/dashboard/tabs/OverviewTab"
import TasksTab from "@/features/dashboard/tabs/TasksTab"
import NotificationsTab from "@/features/dashboard/tabs/NotificationsTab"
import SettingsTab from "../tabs/SettingsTab"

import { useGetNotification } from "@/hooks/notification/useGetNotification"
import { getSortedNotification } from "@/lib/utils"

function TabTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

const Spinner = () => (
  <div
    aria-hidden="true"
    className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
  />
)

export default function Dashboard() {
  const { data: notifications = [], isLoading: isLoadingNotifications, isError: isErrorNotifications } = useGetNotification();
  const [searchParams ] = useSearchParams();
  const validTabs = ["overview", "tasks", "notifications", "settings"] as const

  // console.log(notifications)

  const tab = validTabs.includes(
    searchParams.get("tab") as typeof validTabs[number]
  )
    ? searchParams.get("tab")
    : "overview"

  const sortedNotifications = getSortedNotification(notifications);

  if(isLoadingNotifications) {
    return (
      <div className="flex justify-center items-center gap-2 h-screen">
        <Spinner />
        Loading...
      </div>
    )
  }
  if(isErrorNotifications) {
    return <div>Error</div>
  }
  return (
    <div className="w-full min-h-screen bg-slate-50 bg-white text-black dark:bg-black dark:text-white">
      <SidebarProvider>
        <div className='flex min-h-screen w-full'>
          <Sidebar notifications={sortedNotifications} />
          <main className="flex-1 p-6 space-y-8 min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">

            {tab !== "settings" && tab !== "notifications" && <DashboardHeader notifications={sortedNotifications} />}
            {tab === "overview" && (
              <TabTransition>
                <OverviewTab
                />
              </TabTransition>
            )}
            {tab === "tasks" && (
              <TabTransition>
                <TasksTab 
                />
              </TabTransition>
            )}
            {tab === "notifications" && (
              <TabTransition>
                <NotificationsTab/>
              </TabTransition>
            )}
            {tab === "settings" && (
              <TabTransition >
                <SettingsTab/>
              </TabTransition>
            )}

          </main>
        </div>
      
      </SidebarProvider>
    </div>
  )
}
