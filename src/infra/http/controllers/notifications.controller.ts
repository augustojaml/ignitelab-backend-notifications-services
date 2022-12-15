/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification-use-case';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notification-use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications-use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification-use-case';
import { SendNotificationUseCase } from '@app/use-cases/send-notification-use-case';
import { UnReadNotificationUseCase } from '@app/use-cases/unread-notification-use-case';
import { CreateNotificationBody } from '@infra/dtos/create-notification-body';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { NotificationViewNodel } from '../view-models/notification-view-model';


@Controller('notification')
export class NotificationsController {
  constructor(
    private sendNotifications: SendNotificationUseCase,
    private cancelNotificaton: CancelNotificationUseCase,
    private readNotificaton: ReadNotificationUseCase,
    private unreadNotificaton: UnReadNotificationUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificaton.execute({
      notificationId: id
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: recipientId
    })

    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipeint(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: recipientId
    })

    return {
      notifications: notifications.map(NotificationViewNodel.toHttp)
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificaton.execute({
      notificationId: id
    })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotificaton.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body
    const { notification } = await this.sendNotifications.execute({
      recipientId, content, category
    })

    return {
      notification: NotificationViewNodel.toHttp(notification)
    }
  }
}
