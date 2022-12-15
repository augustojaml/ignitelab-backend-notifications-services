import { makeNotification } from '@test/factories/notification-factory';
import { NotificationRepositoryInMemory } from '@test/repositories/notifications-repository-in-memory';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications-use-case';

describe('Get notification', () => {
  it('should be able to get notifications by recipientId', async () => {
    const notificationRepository = new NotificationRepositoryInMemory();

    const getNotifications = new GetRecipientNotificationsUseCase(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id -1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id -1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'example-recipient-id -2' }),
    );

    const { notifications } = await getNotifications.execute({
      recipientId: 'example-recipient-id -1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id -1' }),
        expect.objectContaining({ recipientId: 'example-recipient-id -1' }),
      ]),
    );
    // expect(notifications).toLe(2);
  });
});
