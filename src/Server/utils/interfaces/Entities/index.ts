import { User } from '../../../orm/entities/User';

/**
 * IEntities interface
 *
 * has all entities included in the object
 */
export default interface IEntities {
  user?: User;
  [name: string]: any;
}
