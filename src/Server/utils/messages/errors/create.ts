import IError, { IErrorObject } from '../../interfaces/Error';
import IAddtionalError from '../../interfaces/AddtionalError/index';

/**
 * Creates the Error-Object
 * @param field Field of Error
 * @param message Message to be send
 * @param additional [Optional] Additional Info to be send
 * @param oldError if an old (given) error exists its appends it to the new Error
 */
const create = (
  field: string,
  message: string,
  additional?: IAddtionalError,
  ...oldError: IErrorObject[]
) => {
  let e = { message, field };
  if (additional) {
    Object.entries(additional).forEach(([key, value]) => {
      e[key] = value;
    });
  }
  return { errors: [e, ...oldError] } as IError;
};
export default create;
