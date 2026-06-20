import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { SidebarProvider } from "@/components/ui/sidebar"

import DashboardHeader from "@/features/dashboard/components/DashboardHeader"

import OverviewTab from "@/features/dashboard/tabs/OverviewTab"
import TasksTab from "@/features/dashboard/tabs/TasksTab"
import NotificationsTab from "@/features/dashboard/tabs/NotificationsTab"
import SettingsTab from "../tabs/SettingsTab"

import { useGetNotification } from "@/hooks/notification/useGetNotification"
import { useGetSettings } from "@/hooks/setting/useGetSettings"
import { getSortedNotification } from "@/lib/utils"

import Loader from "../components/Loader"
import MobileNavbar from "@/features/sidebar/components/MobileNavbar"
import DesktopSidebar from "@/features/sidebar/pages/DesktopSiderbar"

import useAuthStore from "@/store/authStore"
import { applyTheme } from "@/lib/theme"

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
  const { data: settings, isLoading: isLoadingSettings, isError: isErrorSettings } = useGetSettings();
  const [searchParams ] = useSearchParams();
  const validTabs = ["overview", "tasks", "notifications", "settings"] as const

  const appTheme = useAuthStore((state) => state.theme);
  const setTheme = useAuthStore((state) => state.setTheme);

  const tab = validTabs.includes(
    searchParams.get("tab") as typeof validTabs[number]
  )
    ? searchParams.get("tab")
    : "overview"

  const sortedNotifications = getSortedNotification(notifications);

   useEffect(() => {
      if (!settings) return

      setTheme(settings.theme)
    }, [settings])
    
    useEffect(() => {
      applyTheme(appTheme)
    }, [appTheme])

  if(isLoadingNotifications || isLoadingSettings) {
   return <Loader />
  }
  if(isErrorNotifications || isErrorSettings) {
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
          
          <div className="hidden md:block">
            <DesktopSidebar notifications={sortedNotifications} />
          </div>

          <div className="flex flex-col flex-1 min-w-0">

            <MobileNavbar
              notifications={sortedNotifications}
            />

            <main className="
              flex-1
              p-4
              md:p-6
              space-y-6
              min-w-0              
              dark:bg-black dark:text-white
            ">

              {tab !== "settings" && tab !== "notifications" && <DashboardHeader notifications={sortedNotifications} />}
              {tab === "overview" && (
                <TabTransition>
                  <section aria-labelledby="overview-heading">
                    <OverviewTab />
                  </section>
                </TabTransition>
              )}
              {tab === "tasks" && (
                <TabTransition>
                  <section aria-labelledby="tasks-heading">
                    <TasksTab />
                  </section>
                </TabTransition>
              )}
              {tab === "notifications" && (
                <TabTransition>
                  <section aria-labelledby="notifications-heading">
                    <NotificationsTab/>
                  </section>
                </TabTransition>
              )}
              {tab === "settings" && (
                <TabTransition >
                  <section aria-labelledby="settings-heading">
                    <SettingsTab />
                  </section>
                </TabTransition>
              )}

            </main>
          </div>
        </div>
      
      </SidebarProvider>
    </div>
  )
}
