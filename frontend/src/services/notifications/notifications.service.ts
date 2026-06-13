import axios from "axios";
import instance, { AxiosError } from "@/api/axiosInstance";
import type { Notification } from "@/interfaces/notification";

const handleError = (error: unknown, fallbackMessage: string): never => {
    if(axios.isAxiosError(error)){
        throw AxiosError(error, fallbackMessage);
    }
    throw new Error("Unexpected error occurred");
}
export const NotificationServices = {
    getNotifications: async () : Promise<Notification[]> => {
        const res = await instance.get(`users/notifications`);
        return res.data ?? [] as Notification[];
    },
    getNotificationById: async (id: string) : Promise<Notification> => {
        const res = await instance.get(`users/notifications/${id}`);
        return res.data as Notification;
    },
    markNotificationAsRead: async (id: string) => {
        const res = await instance.patch(`users/notifications/read/${id}`);
        return res.data
        
    },
    deleteNotification: async (id : string ) => {
        try {
            const res = await instance.delete(`users/notifications/${id}`);
            return res.data;
        } catch (error) {
            handleError(error, "Failed to fetch notifications");
        }
    },
};