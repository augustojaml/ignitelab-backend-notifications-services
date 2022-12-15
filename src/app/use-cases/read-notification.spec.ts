import { makeNotification } from '@test/factories/notification-factory';
import { NotificationRepositoryInMemory } from '@test/repositories/notifications-repository-in-memory';
import { ReadNotificationUseCase } from './read-notification-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepositoryInMemory = new NotificationRepositoryInMemory();

    const readNotificaton = new ReadNotificationUseCase(
      notificationRepositoryInMemory,
    );

    const notification = makeNotification();

    await notificationRepositoryInMemory.create(notification);

    await readNotificaton.execute({
      notificationId: notification.id,
    });

    expect(notificationRepositoryInMemory.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepositoryInMemory = new NotificationRepositoryInMemory();

    const readNotificaton = new ReadNotificationUseCase(
      notificationRepositoryInMemory,
    );

    expect(() => {
      return readNotificaton.execute({
        notificationId: 'no-existing-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
