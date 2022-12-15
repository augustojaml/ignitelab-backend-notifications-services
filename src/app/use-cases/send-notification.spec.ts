import { NotificationRepositoryInMemory } from '@test/repositories/notifications-repository-in-memory';
import { SendNotificationUseCase } from './send-notification-use-case';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new NotificationRepositoryInMemory();

    const sendNotificaton = new SendNotificationUseCase(notificationRepository);
    const { notification } = await sendNotificaton.execute({
      recipientId: 'example-recipient-id',
      content: 'This is a notification',
      category: 'social',
    });
    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
