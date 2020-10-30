import { SessionController } from '../../orm/controller/SessionController';
import IRouteConfig from '../interfaces/RouteConfig';

/**
 * Session-Routes
 */
export default [
  {
    method: 'use',
    route: '/*',
    controller: SessionController,
    action: 'check',
  },
] as Array<IRouteConfig>;
