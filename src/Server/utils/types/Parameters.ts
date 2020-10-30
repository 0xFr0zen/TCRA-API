import { EntityType } from './Entities';
import IPrefixSearchOnly from '../interfaces/Parameters/PrefixSearchOnly';
import ISearchOnly from '../interfaces/Parameters/SearchOnly';
type TParameters = {
  params: Record<EntityType, IPrefixSearchOnly>;
  body: Record<EntityType | 'user:login', ISearchOnly>;
};

export default TParameters;
