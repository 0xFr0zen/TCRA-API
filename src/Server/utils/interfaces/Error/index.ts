/**
 * IError
 *
 * ErrorObject holder
 */
export default interface IError {
  errors: IErrorObject[];
}

/**
 * IErrorObject
 *
 * has Message & Field
 */
export interface IErrorObject {
  message: string;
  field: string;
  additional?: string;
}
