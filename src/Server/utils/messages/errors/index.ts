import ErrorCreator from './create';

/**
 * Errors
 *
 * These Errors are mandatory
 */
const Errors = {
  /**
   * Session has expired
   */
  SESSION_EXPIRED: ErrorCreator(
    'session:time',
    'The session you are using is expired. Create another one.'
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
   * Redeem does not exist
   */
  REDEEM_DOES_NOT_EXIST: ErrorCreator('redeem:id', 'Redeem does not exist'),

  /**
   * Redeem already exists
   */
  REDEEM_EXISTS_ALREADY: ErrorCreator('redeem:name', 'Redeem already exists'),

  /**
   * Command does not exist
   */
  COMMAND_DOES_NOT_EXIST: ErrorCreator('command:id', 'Command does not exist'),

  /**
   * Command already exists
   */
  COMMAND_EXISTS_ALREADY: ErrorCreator(
    'command:name',
    'command already exists'
  ),
};
export default Errors;
