import INotification from '../../interfaces/Notification';
/**
 * Creates Notification-Object
 * @param title Title of Notification
 * @param message Message of Notification
 * @param additional Additional Information
 */
const create = (title: string, message: string, ...additional: string[]) => {
  return {
    title,
    message,
    additional,
  } as INotification;
};

export default create;
