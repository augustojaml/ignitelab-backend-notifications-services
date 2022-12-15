import { Content } from '@app/entities/notification/content';
import {
  Notification,
  NotificationProps,
} from '@app/entities/notification/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: 'example-recipient-id -1',
    content: new Content('This is a notification'),
    category: 'social',
    ...override,
  });
}
