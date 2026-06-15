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

import Loader from "../components/Loader"

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


export default function Dashboard() {
  const { data: notifications = [], isLoading: isLoadingNotifications, isError: isErrorNotifications } = useGetNotification();
  const [searchParams ] = useSearchParams();
  const validTabs = ["overview", "tasks", "notifications", "settings"] as const


  const tab = validTabs.includes(
    searchParams.get("tab") as typeof validTabs[number]
  )
    ? searchParams.get("tab")
    : "overview"

  const sortedNotifications = getSortedNotification(notifications);

  if(isLoadingNotifications) {
   <Loader />
  }
  if(isErrorNotifications) {
    return (
      <div className="flex justify-center text-red-500 items-center font-semibold gap-2 h-screen">
        <p>Error loading notifications</p>
      </div>
    )
  }
  return (
    <div className="w-full min-h-screen bg-slate-50 text-black
      bg-gradient-to-br from-slate-950 via-slate-900 
            to-indigo-950 text-white
      dark:bg-black dark:text-white">
      <SidebarProvider>
        <div className='flex min-h-screen w-full dark:bg-black dark:text-white'>
          <Sidebar notifications={sortedNotifications} />
          <main className="flex-1 p-6 space-y-8 min-h-screen 
            
            dark:bg-black dark:text-white
          ">

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
