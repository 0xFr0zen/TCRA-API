import { Request } from 'express';
import IParameters from './interfaces/Parameters';
import IParamOrBody from './interfaces/ParamOrBody/index';
import Errors from './messages/errors';

/**
 * Parameters
 *
 * uses `IParameters`
 */
const Parameters: IParameters = {
  params: {
    user: {
      prefix: 'u',
      search: [{ name: 'id', type: 'string' }],
    },
    redeem: {
      prefix: 'r',
      search: [{ name: 'id', type: 'string' }],
    },
    command: {
      prefix: 'c',
      search: [{ name: 'id', type: 'string' }],
    },
  },
  body: {
    user: {
      search: [
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
      ],
    },
    'user:login': {
      search: [
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' },
      ],
    },
    redeem: {
      search: [
        { name: 'name', type: 'string' },
        { name: 'text', type: 'string' },
        { name: 'gif', type: 'string' },
        { name: 'sound', type: 'string' },
        { name: 'volume', type: 'number', defaultvalue: 0.5 },
        { name: 'duration', type: 'number', defaultvalue: 10 },
      ],
    },
    command: {
      search: [
        { name: 'name', type: 'string' },
        { name: 'access', type: 'number', defaultvalue: 4 },
        { name: 'text', type: 'string' },
        { name: 'gif', type: 'string' },
        { name: 'sound', type: 'string' },
        { name: 'volume', type: 'number', defaultvalue: 0.5 },
        { name: 'duration', type: 'number', defaultvalue: 10 },
      ],
    },
  },
};
/**
 * Checks if the parameter are not missing in the given request
 * @param paramtype which should be checked
 * @param request Request
 * @param entity entity
 * @throws Errors.MISSING_QUERY_PARAMETERS
 */
export const hasValidParameters = (
  paramtype: 'body' | 'params',
  request: Request | IParamOrBody,
  entity: string
) => {
  const { search, prefix } = Parameters[paramtype][entity];
  let er;
  for (const { name, type, defaultvalue } of search) {
    let newSearch: string = (prefix ?? '') + name;
    if (newSearch.includes(':')) {
      let [p, p2] = newSearch.split(':');
      if (
        typeof request[paramtype][p] === 'undefined' &&
        typeof request[paramtype][p][p2] === 'undefined'
      ) {
        let pname = `${paramtype}:${newSearch.replace(/\:/g, '->')}`;

        // if(typeof )
        if (defaultvalue) {
          er = Errors.MISSING_QUERY_PARAMETERS(pname, type, defaultvalue);
        } else {
          er = Errors.MISSING_QUERY_PARAMETERS(pname, type);
        }
        break;
      }
    } else {
      let pname = `${paramtype}:${newSearch}`;
      if (typeof request[paramtype][newSearch] === 'undefined') {
        if (typeof defaultvalue !== 'undefined') {
          er = Errors.MISSING_QUERY_PARAMETERS(pname, type, defaultvalue);
        } else {
          er = Errors.MISSING_QUERY_PARAMETERS(pname, type);
        }
        break;
      } else {
        let myvalue = request[paramtype][newSearch];
        let mytype = typeof myvalue;

        if (mytype !== type) {
          er = Errors.WRONG_QUERY_PARAMETER_TYPE(pname, type, mytype, myvalue);
        }
      }
    }
  }
  if (typeof er !== 'undefined') {
    throw er;
  }
};
