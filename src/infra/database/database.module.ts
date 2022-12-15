import { Module } from '@nestjs/common';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { PrismaNotificationsRepository } from './prisma/prisma-notifications.repository';
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DataBaseModule {
  // todo: implement
}
