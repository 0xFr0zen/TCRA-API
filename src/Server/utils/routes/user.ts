import { UserController } from '../../orm/controller/UserController';
import IRouteConfig from '../interfaces/RouteConfig';
/**
 * User-Routes
 */
export default [
  {
    method: 'get',
    route: '/u(ser)?s',
    controller: UserController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/u(ser)?/:uid',
    controller: UserController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/u(ser)?',
    controller: UserController,
    action: 'create',
  },
  {
    method: 'post',
    route: '/u(ser)?/:uid/login',
    controller: UserController,
    action: 'login',
  },
  {
    method: 'put',
    route: '/u(ser)?/:uid',
    controller: UserController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/u(ser)?/:uid',
    controller: UserController,
    action: 'remove',
  },
] as Array<IRouteConfig>;
