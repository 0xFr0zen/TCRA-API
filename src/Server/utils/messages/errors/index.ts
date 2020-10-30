import ErrorCreator from './create';

/**
 * Errors
 *
 * These Errors are mandatory
 */
const Errors = {
  /**
   * Company does not exist
   */
  COMPANY_DOES_NOT_EXIST: ErrorCreator('company:id', 'Company does not exist'),

  /**
   * Company has no productgroups
   */
  COMPANY_HAS_NO_PRODUCTGROUP_S: ErrorCreator(
    'company:product_group',
    'Company has no productgroups'
  ),

  /**
   * Product does not exist
   */
  PRODUCT_DOESNT_EXIST: ErrorCreator('product:id', 'Product does not exist'),
  /**
   * Missing query parameters
   */
  MISSING_QUERY_PARAMETERS: (
    parameter: any,
    paramtype: string,
    defaultvalue?: any
  ) => {
    if (defaultvalue) {
      return ErrorCreator(parameter, `Missing Parameter`, {
        type: paramtype,
        default: defaultvalue,
      });
    } else {
      return ErrorCreator(parameter, `Missing Parameter`, {
        type: paramtype,
      });
    }
  },

  /**
   * Wrong Query Parameter Type
   */
  WRONG_QUERY_PARAMETER_TYPE: (
    parameter: any,
    paramtype: string,
    giventype: string,
    givenvalue: string
  ) => {
    return ErrorCreator(parameter, `Wrong Parameter Type`, {
      type: paramtype,
      giventype,
      givenvalue,
    });
  },

  /**
   * Productgroup does not exist
   */
  PRODUCTGROUP_DOES_NOT_EXIST: ErrorCreator(
    'company:product_group',
    'This Productgroup does not exist'
  ),

  /**
   * User does not exist
   */
  USER_DOES_NOT_EXIST: ErrorCreator('user:id', 'User does not exist'),

  /**
   * User exist already
   */
  USER_EXISTS_ALREADY: ErrorCreator(
    'user:name|user:email',
    'User exist already'
  ),

  /**
   * Slot exists already
   */
  SLOT_EXISTS_ALREADY: ErrorCreator('slot:name', 'Slot exist already'),

  /**
   * Slot does not exist
   */
  SLOT_DOES_NOT_EXIST: ErrorCreator('slot:id', 'Slot does not exist'),

  /**
   * Slot not available
   */
  SLOT_NOT_AVAILABLE: ErrorCreator(
    'slot:time',
    'The time for the slot is already used, please you a different Slot.'
  ),

  /**
   * Notification does not exist
   */
  NOTIFICATION_DOES_NOT_EXIST: ErrorCreator(
    'notification:id',
    'The Notification does not exist'
  ),

  /**
   * Session has expired
   */
  SESSION_EXPIRED: ErrorCreator(
    'session:time',
    'The session you are using is expired. Create another one.'
  ),
};
export default Errors;
