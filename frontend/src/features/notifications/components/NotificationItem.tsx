import type { Notification } from "@/interfaces/notification"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trash2, Loader2 } from "lucide-react"

import { useDeleteNotification } from "@/hooks/notification/UseDeleteNotification"
import { useMarkNotificationAsRead } from "@/hooks/notification/useMarkAsRead"

type NotificationCardProps = {
  notification: Notification
}


export default function NotificationItem( { notification }: NotificationCardProps ) {
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: deleteNotification, isPending: deletionPending } = useDeleteNotification();

  const isLoading = deletionPending;

  const { id, title, message, read,  } = notification

  const changeNotificationStatus = async(id: string) => {
    markAsRead(id)
  }

  const handleDelete = async(id: string) => {
    deleteNotification(id)
  }

  return (
    <article aria-label={`Notification: ${title}`}>
        <Card
          className={`
            shadow-sm hover:shadow-md transition duration-300 space-y-1 
            hover:bg-black/30 bg-white/10 backdrop-blur-xl shadow-2xl
            border border-transparent hover:border-black/200 rounded-md
            cursor-pointer text-white 
            
          `}
          onClick={() => changeNotificationStatus(id!)}
        >
          <CardHeader>        
            <CardTitle className='
              flex justify-between items-center gap-3
              font-semibold text-base
            '>
              
              <div className="flex items-center gap-2">
                {!read && (
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-indigo-400 animate-pulse"
                    aria-label="Unread notification"
                  />
                )}
                <span>{title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Delete notification"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(id!);
                  }}
                  disabled={isLoading}
                  className="p-1 rounded transition cursor-pointer bg-red-300"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin"/>
                  ) : (
                    <Trash2 className="text-red-700" size={20} />
                  )}
                </button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground ">{message}</p>            
          </CardContent>
        </Card>
    </article>
  )
}
