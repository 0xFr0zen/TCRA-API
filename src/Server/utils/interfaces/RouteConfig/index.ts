import { Controller } from '../../../orm/controller/AbstractController';
import { SessionController } from '../../../orm/controller/SessionController';
/**
 * IRouteConfig
 *
 * has Method, Route, Controller & Action
 */
export default interface IRouteConfig {
  method: string;
  route: string;
  controller: typeof Controller | typeof SessionController;
  action: string;
}
