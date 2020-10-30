import NotificationCreator from './create';

/**
 * Notifications
 *
 * These are mandatory
 */
const Notifications = {
  /**
   * Slot is avaliable
   */
  SLOT_AVAILABLE: NotificationCreator(
    'Slot available',
    'The Slot you have selected is available now.'
  ),

  /**
   * Slot has been requested
   */
  SLOT_REQUESTED: NotificationCreator(
    'Slot requested',
    'The Slot you have selected has been requested and will be checked out soon. You will be notified, on the status.'
  ),

  /**
   * Slot has been taken, enjoy!
   */
  SLOT_TAKEN: NotificationCreator(
    'Slot taken',
    'Everything is alright.',
    'Enjoy your stay!'
  ),

  /**
   * Company name is not available
   */
  COMPANY_NAME_NOT_AVAILABLE: NotificationCreator(
    'Company name not available',
    'The company name you chose is already taken. Please try a different name'
  ),

  /**
   * Company name is not allowed
   */
  COMPANY_NAME_NOT_ALLOWED: NotificationCreator(
    'Company name not allowed',
    'The company name you chose is not allowed. If you think otherwise, please contact us via support ticket.'
  ),

  /**
   * Company name is available
   */
  COMPANY_NAME_AVAILABLE: NotificationCreator(
    'Company name available',
    'The company name you reserved is available, please check your messages.'
  ),

  /**
   * Company got deactivated, with reason
   * @param reason Message of Reason
   */
  COMPANY_DEACTIVATED: (reason: string) =>
    NotificationCreator(
      'Company has been deativated',
      'The company you own got deactivated!',
      `Reason: ${reason}`
    ),

  /**
   * Company got banned, with reason
   * @param reason Message of Reason
   */
  COMPANY_BANNED: (reason: string) =>
    NotificationCreator(
      'Company has been banned',
      'The company you own got banned!',
      `Reason: ${reason}`
    ),
};
export default Notifications;
