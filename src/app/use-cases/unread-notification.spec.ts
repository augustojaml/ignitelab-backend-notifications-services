import { makeNotification } from '@test/factories/notification-factory';
import { NotificationRepositoryInMemory } from '@test/repositories/notifications-repository-in-memory';
import { UnReadNotificationUseCase } from './unread-notification-use-case';
import { NotificationNotFoundError } from './errors/notification-not-found-error';

describe('UnRead notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepositoryInMemory = new NotificationRepositoryInMemory();

    const unreadNotificaton = new UnReadNotificationUseCase(
      notificationRepositoryInMemory,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepositoryInMemory.create(notification);

    await unreadNotificaton.execute({
      notificationId: notification.id,
    });

    expect(notificationRepositoryInMemory.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepositoryInMemory = new NotificationRepositoryInMemory();

    const unreadNotificaton = new UnReadNotificationUseCase(
      notificationRepositoryInMemory,
    );

    expect(() => {
      return unreadNotificaton.execute({
        notificationId: 'no-existing-notification',
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
