import NotifcationItem from "@/features/notifications/components/NotificationItem"

import { useGetNotification } from "@/hooks/notification/useGetNotification"
import { getSortedNotification } from "@/lib/utils"

import Loader from "@/features/dashboard/components/Loader";



export default function Notifcations() {
    const { data: notifications = [], isLoading, isError } = useGetNotification();
    const sortedNotifications = getSortedNotification(notifications);

    if(isLoading) { return <Loader />}
    if(isError) {
        return (
            <section
            aria-labelledby="tasks-error"
            className="py-10 text-center"
            >
            <h2
                id="tasks-error"
                className="text-lg font-semibold text-red-500"
            >
                Error loading tasks
            </h2>
            </section>
        );
    }
    
  return (
    <section className="space-y-6">
        <header>
            <h2 className="text-2xl font-bold">Notifications</h2>
            <p className="text-muted-foreground">
                Your notifications.
            </p>
        </header>
        <div className="space-y-6">
            {sortedNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="font-semibold">No notification found</h3>
              </div>
            ): (
                <div className='space-y-6'>
                    {sortedNotifications.map((notification) => (
                        <NotifcationItem key={notification.id} notification={notification} />
                    ))}   
                </div>
            )}
        </div>
    </section>
  )
}
