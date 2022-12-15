/* eslint-disable prettier/prettier */
import { NotificationsRepository } from '@app/repositories/notifications-repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from './errors/notification-not-found-error';


interface UnReadNotificationRequest {
  notificationId: string
}

type UnReadNotificationResponse = void

@Injectable()
export class UnReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) { }

  async execute(
    request: UnReadNotificationRequest,
  ): Promise<UnReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      throw new NotificationNotFoundError()
    }

    notification.unread()

    await this.notificationsRepository.save(notification)

  }
}
