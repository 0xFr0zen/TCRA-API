import { ISearchObject } from '../../SearchObject';
/**
 * IPrefixSearchOnly
 *
 * has Prefix & Search
 */
export default interface IPrefixSearchOnly {
  prefix: string;
  search: Array<ISearchObject>;
}
