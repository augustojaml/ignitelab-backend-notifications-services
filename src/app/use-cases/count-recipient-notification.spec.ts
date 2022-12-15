import { makeNotification } from '@test/factories/notification-factory';
import { NotificationRepositoryInMemory } from '@test/repositories/notifications-repository-in-memory';
import { CountRecipientNotificationsUseCase } from './count-recipient-notification-use-case';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new NotificationRepositoryInMemory();

    const countRecipientNotification = new CountRecipientNotificationsUseCase(
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

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id -1',
    });

    expect(count).toEqual(2);
  });
});
