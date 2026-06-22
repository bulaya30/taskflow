import type { Notification, NotificationType } from "@/interfaces/notification.js"
import NotificationRepository from "@/repositories/notificationRepository.js"
import UserRepository from "@/repositories/userRepository.js";
import { User } from "@/interfaces/user.js"

type NotificationInput = {
  title: string;
  message: string;
  type: NotificationType;
  taskId?: string;
  dedupeKey?: string;
};

export default class NotificationService {

  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository
  ) {}

  private async checkUser(uid: string): Promise<User> {

    if(!uid) throw new Error('User id required')
    
    const user = await this.userRepository.findById(uid)

    if (!user) {
      throw new Error("User not found")
    }
    
    return user
  }

  async getNotification(): Promise<Notification[]> {
    return await this.notificationRepository.findAll() as Notification[];
  }

  private async checkNotification(id: string): Promise<Notification> {
    if(!id) {
      throw new Error("Notification id is required")
    }

    const notification = await this.notificationRepository.findById(id)

    if(!notification) throw new Error("Notification not found")

    return notification
  }

  async getNotificationById(uid: string, id: string): Promise<Notification> {
    
    if(!uid) throw new Error('User id required')
    
    return await this.notificationRepository.findById(id) as Notification
  }
  async getUserNotification(uid: string): Promise<Notification[]> {
    
    await this.checkUser(uid)
    
    return await this.notificationRepository.findByUser(uid) as Notification[]
    
  }

  async createNotification(uid: string, data: NotificationInput): Promise<Notification> {
    await this.checkUser(uid)

    return await this.notificationRepository.create({
      ...data,
      userId: uid,
      read: false
    })
  }

  async markNotificationAsRead (id:string): Promise<boolean> {
    
    await this.checkNotification(id)

    return await this.notificationRepository.update(id, {
      read: true,
      readAt: new Date().toISOString(),
    })
    
  }

  async markAllNotificationsAsRead(uid: string): Promise<boolean> {
    await this.checkUser(uid)
      const notifications = await this.notificationRepository.findByUser(uid)
      await Promise.all(
      notifications
        .filter(n => !n.read)
        .map(n =>
          this.notificationRepository.update(
            String(n.id),
            {
              read: true,
              readAt: new Date().toISOString(),
            }
          )
      )
    )
    return true
  }

  async deleteNotification(id: string):Promise<boolean> {
    await this.checkNotification(id);
    return await this.notificationRepository.delete(id)
  }

  async deleteAllNotification(uid: string): Promise<boolean> {
    await this.checkUser(uid)
    return await this.notificationRepository.deleteAll(uid)
  }

  async resetAllNotification(uid: string): Promise<boolean> {
    await this.checkUser(uid)
    return await this.notificationRepository.reset(uid)
  }
}
