import { makeNotification } from '@test/factories/notification-factory';
import { NotificationRepositoryInMemory } from '@test/repositories/notifications-repository-in-memory';
import { CancelNotificationUseCase } from './cancel-notification-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepositoryInMemory = new NotificationRepositoryInMemory();

    const cancelNotificaton = new CancelNotificationUseCase(
      notificationRepositoryInMemory,
    );

    const notification = makeNotification();

    await notificationRepositoryInMemory.create(notification);

    await cancelNotificaton.execute({
      notificationId: notification.id,
    });

    expect(notificationRepositoryInMemory.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepositoryInMemory = new NotificationRepositoryInMemory();

    const cancelNotificaton = new CancelNotificationUseCase(
      notificationRepositoryInMemory,
    );

    expect(() => {
      return cancelNotificaton.execute({
        notificationId: 'no-existing-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
