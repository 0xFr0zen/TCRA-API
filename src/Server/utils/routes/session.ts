import { SessionController } from '../../orm/controller/SessionController';
import IRouteConfig from '../interfaces/RouteConfig';

/**
 * Session-Routes
 */
export default [
  {
    method: 'use',
    route: '/session',
    controller: SessionController,
    action: 'precheck',
  },
  {
    method: 'use',
    route: /.*(?<!\/session)/,
    controller: SessionController,
    action: 'postcheck',
  },
] as Array<IRouteConfig>;
