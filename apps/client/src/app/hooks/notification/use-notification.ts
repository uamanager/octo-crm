import { NotificationData, notifications } from '@mantine/notifications';

export enum NotificationType {
  Success = 'green',
  Error = 'red',
  Warning = 'orange',
  Info = 'gray',
}

export const useNotification = () => {
  const show = (
    type: NotificationType,
    title: string,
    message: string,
    options: Omit<NotificationData, 'message'> = {},
  ) => {
    notifications.show({
      title,
      message,
      autoClose: options?.autoClose ?? 4000,
      color: type,
      ...options,
    });
  };

  return {
    show,
    success: (
      title: string,
      message: string,
      options: Omit<NotificationData, 'message'> = {},
    ) => {
      show(NotificationType.Success, title, message, options);
    },
    error: (
      title: string,
      message: string,
      options: Omit<NotificationData, 'message'> = {},
    ) => {
      show(NotificationType.Error, title, message, options);
    },
    warning: (
      title: string,
      message: string,
      options: Omit<NotificationData, 'message'> = {},
    ) => {
      show(NotificationType.Warning, title, message, options);
    },
    info: (
      title: string,
      message: string,
      options: Omit<NotificationData, 'message'> = {},
    ) => {
      show(NotificationType.Info, title, message, options);
    },
    clear: (id?: string) => (id ? notifications.hide(id) : notifications.clean()),
  };
};
