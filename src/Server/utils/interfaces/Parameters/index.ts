import { EntityType } from '../../types/Entities';
import ISearchOnly from './SearchOnly';
import IPrefixSearchOnly from './PrefixSearchOnly/index';

/**
 * IParameters
 *
 * has Body & Params
 */
export default interface IParameters {
  body: Record<EntityType | 'user:login', ISearchOnly>;
  params: Record<EntityType, IPrefixSearchOnly>;
}
