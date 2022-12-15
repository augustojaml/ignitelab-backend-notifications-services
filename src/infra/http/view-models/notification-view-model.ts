import { Notification } from '@app/entities/notification/notification';

export class NotificationViewNodel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
