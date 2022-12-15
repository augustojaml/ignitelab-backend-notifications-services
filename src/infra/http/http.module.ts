import { CancelNotificationUseCase } from '@app/use-cases/cancel-notification-use-case';
import { CountRecipientNotificationsUseCase } from '@app/use-cases/count-recipient-notification-use-case';
import { GetRecipientNotificationsUseCase } from '@app/use-cases/get-recipient-notifications-use-case';
import { ReadNotificationUseCase } from '@app/use-cases/read-notification-use-case';
import { SendNotificationUseCase } from '@app/use-cases/send-notification-use-case';
import { UnReadNotificationUseCase } from '@app/use-cases/unread-notification-use-case';
import { DataBaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    UnReadNotificationUseCase,
    ReadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {
  // todo: implement
}
